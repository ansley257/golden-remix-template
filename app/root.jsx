import { tracer } from './lib/trace';
import { cssBundleHref } from '@remix-run/css-bundle';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { LoggerProvider } from './contexts/context.logger';
import { useEffect } from 'react';
import { rumInit } from './lib/rum';
import { datadogRum } from '@datadog/browser-rum';

export const links = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async () => {
  return {
    ENV: {
      DD_RUM_APPLICATION_ID: process.env.DD_RUM_APPLICATION_ID,
      DD_CLIENT_TOKEN: process.env.DD_CLIENT_TOKEN,
      SERVICE_NAME: process.env.SERVICE_NAME,
      NODE_ENV: process.env.NODE_ENV,
      VERSION: process.env.VERSION,
      LOG_LEVEL: process.env.LOG_LEVEL,
    },
  };
};

export default function App() {
  const data = useLoaderData();

  useEffect(() => {
    rumInit();
    datadogRum.startSessionReplayRecording();
    datadogRum.startView('index');
  }, []);

  return (
    <LoggerProvider>
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </LoggerProvider>
  );
}
