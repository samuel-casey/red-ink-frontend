import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import SignUp from './Components/Forms/SignUp/SignUp';
import Account from './Components/Account/Account';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

export const GlobalCtx = createContext(null);

const App = ({ firebase }) => {
	const auth = firebase.auth();

	const [gState, setGState] = useState({
		url: 'https://red-ink-api.web.app',
		uid: null,
		userEmail: null,
		userType: null,
	});

	auth.onAuthStateChanged((firebaseUser) => {
		if (firebaseUser) {
			console.log(firebaseUser);
		} else {
			console.log('not logged in');
		}
	});

	const handleSignUp = async (user) => {
		try {
			// validate emails
			const newUserObject = await auth.createUserWithEmailAndPassword(
				user.email,
				user.password
			);

			const newUser = {
				uid: newUserObject.user.uid,
				userEmail: newUserObject.user.email,
				userType: user.userType,
			};

			setGState({
				...gState,
				uid: newUser.uid,
				userEmail: newUser.userEmail,
				userType: newUser.userType,
			});
		} catch (error) {
			alert(error);
			document.location.reload();
		}
	};

	return (
		<GlobalCtx.Provider value={{ gState, setGState }}>
			<div className='App'>
				<header>
					<Header />
				</header>
				<main>
					<Switch>
						<Route
							exact
							path='/'
							render={(rp) => (
								<>
									<Home {...rp} />
								</>
							)}
						/>

						<Route
							path='/signup'
							render={(rp) => <SignUp {...rp} handleSignUp={handleSignUp} />}
						/>

						<Route
							path='/account'
							render={(rp) => (
								<>
									<Account {...rp} handleSignUp={handleSignUp} />
								</>
							)}
						/>

						<Route
							path='/about'
							render={(rp) =>
								// <About />
								'about'
							}
						/>
					</Switch>
				</main>
				<footer>Footer</footer>
			</div>
		</GlobalCtx.Provider>
	);
};

export default App;
