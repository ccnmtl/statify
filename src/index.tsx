import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('react-root');
const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);