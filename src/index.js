import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

const firebaseConfig = {
	apiKey: 'AIzaSyAHI_ndPIp9T-SGIeLkZyCZY4qL9wqwMUQ',
	authDomain: 'red-ink.firebaseapp.com',
	databaseURL: 'https://red-ink.firebaseio.com',
	projectId: 'red-ink',
	storageBucket: 'red-ink.appspot.com',
	messagingSenderId: '353136361187',
	appId: '1:353136361187:web:27b9cc09ecd6e6190f0fd6',
	measurementId: 'G-CQWPBWG3JJ',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<App firebase={firebase} />
		</React.StrictMode>
	</Router>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
