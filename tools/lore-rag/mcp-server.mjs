#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema, ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { API } from './config.mjs';

const server = new Server(
  { name: 'aevorian-lore', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

const SEARCH_TOOL = {
  name: 'search_lore',
  description:
    'Semantic search over Aevorian lore, returning the most relevant source chunks (no generation). ' +
    'Use collection "campaign" for adventure/NPC/world building (Northwatch Wardens, Aeorian Echo, Northreach). ' +
    'Use collection "novels" ONLY for Old Songs of Aevoria prose — it is firewalled and cannot see campaign material. ' +
    'Prefer this when you (the assistant) will do the writing yourself from grounded sources.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'What to look up' },
      collection: { type: 'string', enum: ['campaign', 'novels'], default: 'campaign' },
      k: { type: 'number', default: 6, description: 'Number of chunks to return' },
    },
    required: ['query'],
  },
};

const ASK_TOOL = {
  name: 'ask_lore',
  description:
    'Retrieve Aevorian lore AND draft a grounded answer/prose with the local LM Studio writing model ' +
    '(Lumimaid/MythoMax for novels, Qwen for campaign). collection "novels" is firewalled from campaign canon. ' +
    'Use this to get a local-model draft; use search_lore instead when you will write the prose yourself.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      collection: { type: 'string', enum: ['campaign', 'novels'], default: 'campaign' },
      k: { type: 'number', default: 6 },
      model: { type: 'string', description: 'Override the LM Studio model id' },
    },
    required: ['query'],
  },
};

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [SEARCH_TOOL, ASK_TOOL] }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args = {} } = req.params;
  const { query, collection = 'campaign', k = 6, model } = args;

  if (name === 'search_lore') {
    const res = await fetch(`${API}/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ collection, query, k }),
    });
    if (!res.ok) return { content: [{ type: 'text', text: `error: ${await res.text()}` }], isError: true };
    const { results } = await res.json();
    const text = results.map(r =>
      `### ${r.source_path}${r.heading ? ' — ' + r.heading : ''}  (score ${r.score.toFixed(3)})\n${r.text}`
    ).join('\n\n---\n\n') || 'No results.';
    return { content: [{ type: 'text', text }] };
  }

  if (name === 'ask_lore') {
    const res = await fetch(`${API}/ask`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ collection, query, k, model }),
    });
    if (!res.ok) return { content: [{ type: 'text', text: `error: ${await res.text()}` }], isError: true };
    const data = await res.json();
    const footer = (data.sources || []).map(s => s.source_path).join(', ');
    return { content: [{ type: 'text', text: `${data.answer}\n\n---\nSources: ${footer}\nModel: ${data.model}` }] };
  }

  return { content: [{ type: 'text', text: `unknown tool: ${name}` }], isError: true };
});

await server.connect(new StdioServerTransport());
