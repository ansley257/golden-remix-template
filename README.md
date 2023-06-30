# Configuration

Put these variables in a .env file, inside /app

SERVICE_NAME
VERSION
DD_API_KEY
DD_RUM_APPLICATION_ID
DD_CLIENT_TOKEN

## Logs

For the frontend, go through the utils/service.logger. For the backend, go through /lib/logger.

# Tracing

Likely going to have to do a lot of custom instrumenting. The documentation is [here](https://datadoghq.dev/dd-trace-js/index.html).

# RUM

For RUM to work you have to start a view. This is done in the root.jsx, so just remember that if you decide to edit root.jsx.
