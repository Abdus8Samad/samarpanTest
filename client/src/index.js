// import { createRoot } from "react-dom";
import ContextsProvider from "./Components/Contexts";
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextsProvider>
        <Router>
            <App />
        </Router>
    </ContextsProvider>
);