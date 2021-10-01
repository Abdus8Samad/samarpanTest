import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextsProvider from './Components/Contexts';

const MainApp = () =>{
  return(
	<ContextsProvider>
		<Router>
			<App />
		</Router>
	</ContextsProvider>
  )
}


ReactDOM.render(
	<MainApp />
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
