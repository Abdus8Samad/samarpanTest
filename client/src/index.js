import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextsProvider from "./Components/Contexts";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./Components/App";
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextsProvider>
        <Router>
            <App />
        </Router>
    </ContextsProvider>
);