import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import { Link, Route, Switch } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import SignUp from './Components/Forms/SignUp/SignUp';
import Account from './Components/Account/Account';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import LogIn from './Components/Forms/LogIn/LogIn';
import PasswordReset from './Components/Forms/PasswordReset/PasswordReset';
import axios from 'axios';

export const GlobalCtx = createContext(null);

const App = ({ firebase }) => {
	const auth = firebase.auth();

	const nullUserGState = {
		url: 'https://red-ink.web.app/api',
		uid: null,
		userEmail: null,
		userType: null,
	};

	const [gState, setGState] = useState(nullUserGState);

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
			return true;
		} catch (error) {
			alert(error);
			document.location.reload();
		}
	};

	const checkCollectionForUser = async (user) => {
		try {
			const res = await axios.get(
				gState.url + `/${user.userType.toLowerCase()}s/` + user.uid
			);
			const targetUser = res.data;
			if (targetUser.data.length === 0) {
				alert(
					`No ${user.userType} account exists for ${user.userEmail}. Please try another account type or create a new account.`
				);
				document.location.reload();
			} else {
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogIn = async (user) => {
		try {
			// validate emails
			const newUserObject = await auth.signInWithEmailAndPassword(
				user.email,
				user.password
			);

			const newUser = {
				uid: newUserObject.user.uid,
				userEmail: newUserObject.user.email,
				userType: user.userType,
			};

			await checkCollectionForUser(newUser, 'Writers');

			setGState({
				...gState,
				uid: newUser.uid,
				userEmail: newUser.userEmail,
				userType: newUser.userType,
			});
			return true;
		} catch (error) {
			alert(error);
			return false;
		}
	};

	const handleLogOut = () => {
		auth.signOut();
		setGState(nullUserGState);
	};

	let successMessage = '';

	const handlePasswordReset = async (resetUser) => {
		console.log(resetUser);
	};

	const handleSendPasswordResetEmail = async (resetUser) => {
		try {
			// let sent;
			// if (resetEmail === gState.userEmail) {
			// 	sent = await auth.sendPasswordResetEmail();
			// } else {
			// 	console.log(gState.userEmail);
			// 	throw new Error(
			// 		'Please ensure you are trying to reset the password for your correct email address.'
			// 	);
			// }
			const sent = await auth.sendPasswordResetEmail(resetUser.email);
			alert(
				`Password reset email successfully sent to ${resetUser.email}. Logging out.`
			);
			handleLogOut();
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		// calls this onStateChanged any time uid in gState changes
		auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				// console.log(firebaseUser);
			} else {
				// console.log('not logged in');
			}
		});
	}, [gState.uid]);

	return (
		<GlobalCtx.Provider value={{ gState, setGState }}>
			<div className='App'>
				<header>
					<Header handleLogOut={handleLogOut} />
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
							path='/login'
							render={(rp) => <LogIn {...rp} handleLogIn={handleLogIn} />}
						/>

						<Route
							path='/account'
							render={(rp) => (
								<>
									<Account
										{...rp}
										handleSendPasswordResetEmail={handleSendPasswordResetEmail}
										successMessage={successMessage}
									/>
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

						<Route
							path='/resetpassword'
							render={(rp) => (
								<PasswordReset
									{...rp}
									handlePasswordReset={handlePasswordReset}
								/>
							)}
						/>
					</Switch>
				</main>
				<footer>Footer</footer>
			</div>
		</GlobalCtx.Provider>
	);
};

export default App;
