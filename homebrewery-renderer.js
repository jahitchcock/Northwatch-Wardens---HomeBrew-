/**
 * Homebrewery Markdown Renderer
 * 
 * Adapted from naturalcrit/homebrewery shared/markdown.js
 * This module provides authentic Homebrewery markdown rendering
 * with all the official extensions and syntax support.
 */

const _                         = require('lodash');
const { marked: Marked }        = require('marked');
const MarkedExtendedTables      = require('marked-extended-tables');
const MarkedDefinitionLists     = require('marked-definition-lists');
const MarkedAlignedParagraphs   = require('marked-alignment-paragraphs');
const MarkedNonbreakingSpaces   = require('marked-nonbreaking-spaces');
const MarkedSubSuperText        = require('marked-subsuper-text');
const { markedVariables }       = require('marked-variables');
const { markedSmartypantsLite } = require('marked-smartypants-lite');
const { gfmHeadingId }          = require('marked-gfm-heading-id');
const { markedEmoji }           = require('marked-emoji');

const renderer  = new Marked.Renderer();
const tokenizer = new Marked.Tokenizer();

//Processes the markdown within an HTML block if it's just a class-wrapper
renderer.html = function (token) {
	let html = token.text;
	if(_.startsWith(_.trim(html), '<div') && _.endsWith(_.trim(html), '</div>')){
		const openTag = html.substring(0, html.indexOf('>')+1);
		html = html.substring(html.indexOf('>')+1);
		html = html.substring(0, html.lastIndexOf('</div>'));

		const opts = Marked.defaults;
		const tokens = Marked.lexer(html, opts);
		// Only walk tokens if walkTokens is properly defined
		if(opts.walkTokens && typeof opts.walkTokens === 'function') {
			try {
				Marked.walkTokens(tokens, opts.walkTokens);
			} catch(e) {
				// If walkTokens fails, continue without it
			}
		}
		return `${openTag} ${Marked.parser(tokens, opts)} </div>`;
	}
	return html;
};

// Don't wrap {{ Spans alone on a line, or {{ Divs in <p> tags
renderer.paragraph = function(token){
	let match;
	const text = this.parser.parseInline(token.tokens);
	if(text.startsWith('<div') || text.startsWith('</div'))
		return `${text}`;
	else if(match = text.match(/(^|^.*?\n)<span class="inline-block(.*?<\/span>)$/))
		return `${match[1].trim() ? `<p>${match[1]}</p>` : ''}<span class="inline-block${match[2]}`;
	else
		return `<p>${text}</p>\n`;
};

//Fix local links in the Preview iFrame to link inside the frame
renderer.link = function (token) {
	let { href, title, tokens } = token;
	const text = this.parser.parseInline(tokens);
	let self = false;
	if(href[0] == '#') {
		self = true;
	}
	href = cleanUrl(href);

	if(href === null) {
		return text;
	}
	let out = `<a href="${escape(href)}"`;
	if(title) {
		out += ` title="${escape(title)}"`;
	}
	if(self) {
		out += ' target="_self"';
	}
	out += `>${text}</a>`;
	return out;
};

// Expose `src` attribute as `--HB_src` to make the URL accessible via CSS
renderer.image = function (token) {
	const { href, title, text } = token;
	if(href === null)
		return text;

	let out = `<img src="${href}" alt="${text}" style="--HB_src:url(${href});"`;
	if(title)
		out += ` title="${title}"`;

	out += '>';
	return out;
};

// Disable default reflink behavior, as it steps on our variables extension
tokenizer.def = function () {
	return undefined;
};

const processStyleTags = (string)=>{
	const tags = string.match(/(?:[^, ":=]+|[:=](?:"[^"]*"|))+/g);
	if(!tags) return {};

	const id         = _.remove(tags, (tag)=>tag.startsWith('#')).map((tag)=>tag.slice(1))[0]        || null;
	const classes    = _.remove(tags, (tag)=>(!tag.includes(':')) && (!tag.includes('='))).join(' ') || null;
	const attributes = _.remove(tags, (tag)=>(tag.includes('='))).map((tag)=>tag.replace(/="?([^"]*)"?/g, '="$1"'))
		?.filter((attr)=>!attr.startsWith('class="') && !attr.startsWith('style="') && !attr.startsWith('id="'))
		.reduce((obj, attr)=>{
			const index = attr.indexOf('=');
			let [key, value] = [attr.substring(0, index), attr.substring(index + 1)];
			value = value.replace(/"/g, '');
			obj[key.trim()] = value.trim();
			return obj;
		}, {}) || null;
	const styles = tags?.length ? tags.reduce((styleObj, style)=>{
		const index = style.indexOf(':');
		const [key, value] = [style.substring(0, index), style.substring(index + 1)];
		styleObj[key.trim()] = value.replace(/"?([^"]*)"?/g, '$1').trim();
		return styleObj;
	}, {}) : null;

	return {
		id         : id,
		classes    : classes,
		styles     : _.isEmpty(styles)     ? null : styles,
		attributes : _.isEmpty(attributes) ? null : attributes
	};
};

const mustacheSpans = {
	name  : 'mustacheSpans',
	level : 'inline',
	start(src) { return src.match(/{{[^{]/)?.index; },
	tokenizer(src, tokens) {
		const completeSpan = /^{{[^\n]*}}/;
		const inlineRegex = /{{(?=((?:[:=](?:"['\w,\-+*/()#%=?.&:!@$^;:\[\]_= ]*"|[\w\-+*/()#%.]*)|[^"=':{}\s]*)*))\1 *|}}/g;
		const match = completeSpan.exec(src);
		if(match) {
			let blockCount = 0;
			let tags = {};
			let endTags = 0;
			let endToken = 0;
			let delim;
			while (delim = inlineRegex.exec(match[0])) {
				if(_.isEmpty(tags)) {
					tags = processStyleTags(delim[0].substring(2));
					endTags = delim[0].length;
				}
				if(delim[0].startsWith('{{')) {
					blockCount++;
				} else if(delim[0] == '}}' && blockCount !== 0) {
					blockCount--;
					if(blockCount == 0) {
						endToken = inlineRegex.lastIndex;
						break;
					}
				}
			}

			if(endToken) {
				const raw = src.slice(0, endToken);
				const text = raw.slice(endTags || -2, -2);

				return {
					type   : 'mustacheSpans',
					raw    : raw,
					text   : text,
					tags   : tags,
					tokens : this.lexer.inlineTokens(text)
				};
			}
		}
	},
	renderer(token) {
		const tags = token.tags;
		tags.classes = ['inline-block', tags.classes].join(' ').trim();
		return `<span` +
			`${tags.classes    ? ` class="${tags.classes}"` : ''}` +
			`${tags.id         ? ` id="${tags.id}"`         : ''}` +
			`${tags.styles     ? ` style="${Object.entries(tags.styles).map(([key, value])=>`${key}:${value};`).join(' ')}"` : ''}` +
			`${tags.attributes ? ` ${Object.entries(tags.attributes).map(([key, value])=>`${key}="${value}"`).join(' ')}`     : ''}` +
			`>${this.parser.parseInline(token.tokens)}</span>`;
	}
};

const mustacheDivs = {
	name  : 'mustacheDivs',
	level : 'block',
	start(src) { return src.match(/\n *{{[^{]/m)?.index; },
	tokenizer(src, tokens) {
		const completeBlock = /^ *{{[^\n}]* *\n.*\n *}}/s;
		const blockRegex = /^ *{{(?=((?:[:=](?:"['\w,\-+*/()#%=?.&:!@$^;:\[\]_= ]*"|[\w\-()#%.]*)|[^"=':{}\s]*)*))\1 *$|^ *}}$/gm;
		const match = completeBlock.exec(src);
		if(match) {
			let blockCount = 0;
			let tags = {};
			let endTags = 0;
			let endToken = 0;
			let delim;
			while (delim = blockRegex.exec(match[0])?.[0].trim()) {
				if(_.isEmpty(tags)) {
					tags = processStyleTags(delim.substring(2));
					endTags = delim.length + src.indexOf(delim);
				}
				if(delim.startsWith('{{')) {
					blockCount++;
				} else if(delim == '}}' && blockCount !== 0) {
					blockCount--;
					if(blockCount == 0) {
						endToken = blockRegex.lastIndex;
						break;
					}
				}
			}

			if(endToken) {
				const raw = src.slice(0, endToken);
				const text = raw.slice(endTags || -2, -2);
				return {
					type   : 'mustacheDivs',
					raw    : raw,
					text   : text,
					tags   : tags,
					tokens : this.lexer.blockTokens(text)
				};
			}
		}
	},
	renderer(token) {
		const tags = token.tags;
		tags.classes = ['block', tags.classes].join(' ').trim();
		return `<div` +
			`${tags.classes    ? ` class="${tags.classes}"` : ''}` +
			`${tags.id         ? ` id="${tags.id}"`         : ''}` +
			`${tags.styles     ? ` style="${Object.entries(tags.styles).map(([key, value])=>`${key}:${value};`).join(' ')}"` : ''}` +
			`${tags.attributes ? ` ${Object.entries(tags.attributes).map(([key, value])=>`${key}="${value}"`).join(' ')}` : ''}` +
			`>${this.parser.parse(token.tokens)}</div>`;
	}
};

const forcedParagraphBreaks = {
	name  : 'hardBreaks',
	level : 'block',
	start(src) { return src.match(/\n:+$/m)?.index; },
	tokenizer(src, tokens) {
		const regex  = /^(:+)(?:\n|$)/ym;
		const match = regex.exec(src);
		if(match?.length) {
			return {
				type   : 'hardBreaks',
				raw    : match[0],
				length : match[1].length,
				text   : ''
			};
		}
	},
	renderer(token) {
		return `<div class='blank'></div>\n`.repeat(token.length);
	}
};

function cleanUrl(href) {
	try {
		href = encodeURI(href).replace(/%25/g, '%');
	} catch {
		return null;
	}
	return href;
}

const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
	'&'  : '&amp;',
	'<'  : '&lt;',
	'>'  : '&gt;',
	'"'  : '&quot;',
	'\'' : '&#39;'
};
const getEscapeReplacement = (ch)=>escapeReplacements[ch];
const escape = function (html, encode) {
	if(encode) {
		if(escapeTest.test(html)) {
			return html.replace(escapeReplace, getEscapeReplacement);
		}
	} else {
		if(escapeTestNoEncode.test(html)) {
			return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
		}
	}
	return html;
};

// Configure Marked with Homebrewery extensions
const tableTerminators = [
	`:+\\n`,
	` *{[^\n]+}`,
	` *{{[^{\n]*\n.*?\n}}`
];

Marked.use(markedVariables());
Marked.use(MarkedDefinitionLists());
Marked.use({ extensions: [forcedParagraphBreaks, mustacheSpans, mustacheDivs] });
Marked.use(MarkedAlignedParagraphs());
Marked.use(MarkedSubSuperText());
Marked.use(MarkedNonbreakingSpaces());
Marked.use({ renderer: renderer, tokenizer: tokenizer, mangle: false });
Marked.use(
	MarkedExtendedTables({ interruptPatterns: tableTerminators }),
	gfmHeadingId({ globalSlugs: true }),
	markedSmartypantsLite(),
	markedEmoji({ emojis: {}, renderer: (token)=>`<span>${token.emoji}</span>` })
);

/**
 * Render markdown with Homebrewery syntax
 * @param {string} rawBrewText - The markdown text to render
 * @returns {string} - HTML output
 */
function render(rawBrewText) {
	// Process \column breaks
	rawBrewText = rawBrewText.replace(/^\\column(?:break)?$/gm, `\n<div class='columnSplit'></div>\n`);
	
	// Process \page breaks  
	rawBrewText = rawBrewText.replace(/^\\page$/gm, `\n<div class='pagebreak'></div>\n`);

	const opts = Marked.defaults;
	
	const tokens = Marked.lexer(rawBrewText, opts);
	
	// Walk tokens if walkTokens function is defined
	if(opts.walkTokens && typeof opts.walkTokens === 'function') {
		Marked.walkTokens(tokens, opts.walkTokens);
	}
	
	const html = Marked.parser(tokens, opts);
	
	return html;
}

module.exports = {
	render,
	marked: Marked
};
