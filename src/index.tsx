import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as Sentry from '@sentry/react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { App } from './app';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://ad0efe61f65143d6b66e7b1a643988fb@o46310.ingest.sentry.io/4505127209992192',
        integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
        // Performance Monitoring
        tracesSampleRate: 1.0,
        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0
    });
}
const container = document.getElementById('react-root');
const root = ReactDOMClient.createRoot(container);

root.render(
    <App />
);