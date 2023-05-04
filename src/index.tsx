import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

const container = document.getElementById('react-root');
const root = ReactDOMClient.createRoot(container);

const App: React.FC = () => {
    return (<h1 className='text-danger'>Hello World!</h1>);
};

root.render(
    <App />
);