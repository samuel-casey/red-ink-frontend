import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import SignUp from './Components/Forms/SignUp/SignUp';
import EditorAccount from './Components/EditorAccount/EditorAccount';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

export const GlobalCtx = createContext(null);

const App = ({ firebase }) => {
	const auth = firebase.auth();

	const [gState, setGState] = useState({
		url: 'https://red-ink-api.web.app',
		cUser: null,
		userEmail: null,
	});

	const handleSignUp = async (user) => {
		try {
			// validate emails
			const newUser = await auth.createUserWithEmailAndPassword(
				user.email,
				user.password
			);
			console.log(newUser.user);
			setGState({
				...gState,
				uid: newUser.user.uid,
				userEmail: newUser.user.email,
				userType: user.userType,
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
							path='/editor/account'
							render={(rp) => (
								<>
									{gState.cUser}
									{gState.url}
									{gState.userEmail}
									<EditorAccount {...rp} handleSignUp={handleSignUp} />
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
