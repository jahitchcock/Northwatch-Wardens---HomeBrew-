module.exports = {
  apps: [{
    name: 'dm-panel',
    script: 'server.js',
    cwd: __dirname,
    // Auto-restart if the process dies (e.g. from its own terminal)
    autorestart: true,
    max_restarts: 10,
    min_uptime: '5s',
    restart_delay: 1000,
    // Watch for changes and auto-reload (ignores data/uploads/node_modules)
    watch: ['server.js', 'lib', 'public', 'views'],
    watch_delay: 1000,
    ignore_watch: ['node_modules', 'data', '*.log'],
    // Environment
    env: {
      NODE_ENV: 'production',
      PORT: 5050,
      HOST: '0.0.0.0',
    },
    // Logging
    error_file: 'logs/dm-panel-error.log',
    out_file: 'logs/dm-panel-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
