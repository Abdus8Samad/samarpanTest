// import { createRoot } from "react-dom";
import ContextsProvider from "./Components/Contexts";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from "./Components/App";
import './index.scss';

// const rootElement = ReactDOM.createRoot(document.getElementById("root"));
// const root = createRoot(rootElement);
ReactDOM.render(
    <ContextsProvider>
        <Router>
            <App />
        </Router>
    </ContextsProvider>
, document.getElementById("root"));
