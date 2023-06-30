import { datadogRum } from '@datadog/browser-rum';

export const rumInit = () => {
  // rumInit();
  datadogRum.init({
    applicationId: window.ENV.DD_RUM_APPLICATION_ID,
    clientToken: window.ENV.DD_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: window.ENV.SERVICE_NAME,
    env: window.ENV.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    version: window.ENV.VERSION,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    trackFrustrations: true,
    defaultPrivacyLevel: 'mask-user-input',
    silentMultipleInit: true,
    allowedTracingUrls: [
      (url) => url.startsWith('http://localhost:3000'),
      (url) => url.startsWith('http://192.168.0.169:3000'),
    ],
  });
};
