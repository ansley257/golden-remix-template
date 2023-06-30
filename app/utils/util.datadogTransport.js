// write a datadog transport for winston
import { tracer } from '../lib/trace';
import Transport from 'winston-transport';
import { client, v2 } from '@datadog/datadog-api-client';

// DO NOT INSTANTIATE THE LOGGER HERE, IT WILL CAUSE A CIRCULAR DEPENDENCY

export class DatadogTransport extends Transport {
  // Custom Winston transporter for Datadog API

  constructor(options) {
    super(options);
    this.name = 'datadog';
    this.configurationOpts = {
      authMethods: {
        apiKeyAuth: options.ddApiKey,
      },
    };
    this.configuration = client.createConfiguration(this.configurationOpts);
    this.apiInstance = new v2.LogsApi(this.configuration);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { source, hostname, message, service, userAgent, ...meta } = info;
    const ddtags = Object.keys(meta)
      .map((key) => {
        if (typeof key === 'string' && typeof meta[key] === 'string') {
          return `${key}:${meta[key]}`;
        } else {
          return '';
        }
      })
      .filter((tag) => tag !== '')
      .join(',');

    const body = [
      {
        ddsource: source,
        ddtags,
        hostname,
        message: JSON.stringify({ message, userAgent, ...meta }),
        service,
      },
    ];

    const params = {
      body,
      contentEncoding: 'gzip',
    };

    tracer.trace('datadogTransport.log', () => {
      this.apiInstance.submitLog(params).catch((err) => {
        console.error(err);
      });
    });

    callback();
  }
}
