export class Logger {
  constructor(
    level = 'info',
    metadata = {},
    parent = null,
    batchSize = 10,
    batchInterval = 5000
  ) {
    this.level = level;
    this.metadata = metadata;
    this.parent = parent;
    this.children = {};
    this.apiEndpoint = 'http://localhost:3000/api/log';
    this.logEntries = [];
    this.batchSize = batchSize;
    this.batchInterval = batchInterval;
    this.startBatching();
  }

  log(level, message, metadata = {}) {
    if (this.levels[this.level] >= this.levels[level]) {
      const combinedMetadata = { ...this.metadata, ...metadata };
      this.logEntries.push({ level, message, metadata: combinedMetadata });

      if (this.logEntries.length >= this.batchSize) {
        this.sendBatch();
      }
    }
  }

  info(message, metadata) {
    this.log('info', message, metadata);
  }

  warn(message, metadata) {
    this.log('warn', message, metadata);
  }

  error(message, metadata) {
    this.log('error', message, metadata);
  }

  child(name, metadata = {}) {
    if (!this.children[name]) {
      this.children[name] = new Logger(
        this.level,
        { ...this.metadata, ...metadata },
        this
      );
    }
    return this.children[name];
  }

  getChild(name) {
    return this.children[name];
  }

  async sendBatch() {
    if (this.logEntries.length > 0) {
      const payload = this.logEntries;
      this.logEntries = [];

      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }
  }

  startBatching() {
    this.batchIntervalId = setInterval(
      () => this.sendBatch(),
      this.batchInterval
    );
  }

  levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
  };
}
