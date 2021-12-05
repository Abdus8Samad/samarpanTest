import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextsProvider from './Components/Contexts';
import './index.scss';

const MainApp = () =>{
  return(
	<ContextsProvider>
		<Router>
			<App />
		</Router>
	</ContextsProvider>
  )
}


/* --- Concurrent Mode --- */
// const mountNode = document.getElementById("root");
// ReactDOM.createRoot(mountNode).render(<MainApp />);


/* --- Normal Mode --- */
ReactDOM.render(
	<MainApp />
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
