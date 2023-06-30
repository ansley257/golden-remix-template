import os from 'os';

export const tracer = require('dd-trace').init({
  service: process.env.SERVICE_NAME,
  env: process.env.NODE_ENV,
  version: process.env.VERSION,
  hostname: os.hostname(),
  logInjection: true,
  analytics: true,
  runtimeMetrics: true,
  tags: {
    pid: process.pid,
    source: 'remix',
  },
  debug: process.env.DEBUG === 'true',
  enabled: process.env.NODE_ENV !== 'test',
  sampleRate: 0.8,
  logLevel: 'debug',
  profiling: true,
  appSec: {
    enabled: true,
  },
});
