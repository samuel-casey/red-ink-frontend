// IMPORT PACKAGES
import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import axios from 'axios';

// IMPORT HELPERS
import {
	addUserToWritersCollection,
	addUserToEditorsCollection,
} from './apiHelpers/authHelpers';

// IMPORT COMPONENTS
import SignUp from './Components/Forms/SignUp/SignUp';
import Account from './Components/Account/Account';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import LogIn from './Components/Forms/LogIn/LogIn';
import PasswordReset from './Components/Forms/PasswordReset/PasswordReset';
import ErrorDropdown from './Components/ErrorDropdown/ErrorDropdown';
import AllEditors from './Components/AllEditors/AllEditors';

export const GlobalCtx = createContext(null);

const App = ({ firebase }) => {
	const auth = firebase.auth();

	const nullUserGState = {
		url: 'https://red-ink.web.app/api',
		uid: null,
		userEmail: null,
		userType: null,
		errorDropdown: null,
		numEditors: null,
	};

	const [gState, setGState] = useState(nullUserGState);
	const { url } = gState;

	// not lifted to apiHelpers/authHelpers.js because setGState needed, but this is not a functional component -- moving function would require significant refactoring
	const checkCollectionForUser = async (user, collection) => {
		try {
			// collection is either 'writers' or 'editors' and is case-sensitive
			const res = await axios.get(gState.url + `/${collection}/` + user.uid);
			const targetUser = res.data;
			if (user.userEmail === undefined) {
				console.log('no User Email');
			} else if (targetUser.data.length === 0) {
				setGState({
					...gState,
					errorDropdown: `No ${user.userType} account exists for ${user.userEmail}. Please try another account type or create a new account.`,
				});
			} else {
				return true;
			}
		} catch (error) {
			return false;
		}
	};

	const handleSignUp = async (user) => {
		try {
			// validate emails

			const newUserObject = await auth.createUserWithEmailAndPassword(
				user.email,
				user.password
			);

			let newUser;

			switch (user.userType) {
				case 'Writer':
					newUser = {
						uid: newUserObject.user.uid,
						userEmail: newUserObject.user.email,
					};
					console.log('new User', newUser);
					await addUserToWritersCollection(newUser, gState.url);
					break;
				case 'Editor':
					newUser = {
						uid: newUserObject.user.uid,
						userEmail: newUserObject.user.email,
						aboutMe: user.aboutMe,
						areaOfExpertise: user.areaOfExpertise,
						firstName: user.firstName,
						lastName: user.lastName,
						userType: user.userType,
						linkedInUrl: user.linkedInUrl,
						twitterUrl: user.twitterUrl,
						profileImgUrl: user.profileImgUrl,
					};
					await addUserToEditorsCollection(newUser, gState.url);
					break;
				default:
					newUser = null;
			}

			setGState({
				...gState,
				uid: newUser.uid,
				userEmail: newUser.userEmail,
				userType: newUser.userType,
			});
			return true;
		} catch (error) {
			if (
				error.message ===
				'The email address is already in use by another account.'
			) {
				setGState({
					...gState,
					errorDropdown:
						'The email address you entered is already in use by another account. If you have a Writer account and are attempting to make an Editor account, or vice versa, please email red.ink.user.help@gmail.com. Our platform currently only allows for users to have one type of account.',
				});
			}
		}
	};

	const handleLogIn = async (user) => {
		console.log('URL', url);

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

			setGState({
				...gState,
				uid: newUser.uid,
				userEmail: newUser.userEmail,
				userType: newUser.userType,
			});

			await checkCollectionForUser(newUser, 'writers');
			await checkCollectionForUser(newUser, 'editors');

			if (gState.errorDropdown === null) {
				return true;
			}
		} catch (error) {
			console.log('error', error);
			setGState({
				...gState,
				errorDropdown: error.message,
			});
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
			await auth.sendPasswordResetEmail(resetUser.email);
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
	}, [auth]);

	const errorDropdownBanner = gState.errorDropdown ? <ErrorDropdown /> : null;

	return (
		<GlobalCtx.Provider value={{ gState, setGState }}>
			<div className='App'>
				<header>
					<Header handleLogOut={handleLogOut} />
					{errorDropdownBanner}
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

						<Route path='/editors' render={(rp) => <AllEditors />} />

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
