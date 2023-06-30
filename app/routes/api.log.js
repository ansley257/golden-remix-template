// routes/api/log.js
import { tracer } from '../lib/trace';
import { json } from '@remix-run/node';
import { Logger } from '../lib/logger'; // assuming this is where your logger file is located

export let loader = async ({ request }) => {
  const body = await request.json();
  body.forEach((log) => {
    const { level, message, metadata } = log;
    Logger.log(level, message, metadata);
  });

  return json({}, { status: 200 });
};

export let action = async ({ request }) => {
  const body = await request.json();
  body.forEach((log) => {
    const { level, message, metadata } = log;
    Logger.log(level, message, metadata);
  });

  return json({}, { status: 200 });
};
