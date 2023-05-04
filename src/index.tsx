import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as Sentry from "@sentry/react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: "https://ad0efe61f65143d6b66e7b1a643988fb@o46310.ingest.sentry.io/4505127209992192",
        integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
}
const container = document.getElementById('react-root');
const root = ReactDOMClient.createRoot(container);

const App: React.FC = () => {
    return (<h1 className='text-danger'>Hello World!</h1>);
};

root.render(
    <App />
);