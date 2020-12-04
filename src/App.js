// IMPORT PACKAGES
import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import axios from 'axios';
import * as p from 'pluralize';
import { fbase } from './index';

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
import SubmissionChecklist from './Components/SubmissionChecklist/SubmissionChecklist';
import Footer from './Components/Footer/Footer';
import SubmissionForm from './Components/Forms/SubmissionForm/SubmissionForm';
import FAQ from './Components/FAQ/FAQ';
import About from './Components/About/About';
import StorageTest from './Components/StorageTest/StorageTest';

export const GlobalCtx = createContext(null);

const App = () => {
	const auth = fbase.auth();

	const initialGState = {
		url: 'https://red-ink.web.app/api',
		uid: JSON.parse(window.localStorage.getItem('uid')),
		userEmail: JSON.parse(window.localStorage.getItem('email')),
		userType: JSON.parse(window.localStorage.getItem('userType')),
		errorDropdown: null,
		numEditors: null,
		numWriters: null,
		editorUid: null,
		editorEmail: null,
	};

	const [gState, setGState] = useState(initialGState);

	// not lifted to apiHelpers/authHelpers.js because setGState needed, but this is not a functional component -- moving function would require significant refactoring
	const checkCollectionForUser = async (user, collection) => {
		try {
			// collection is either 'writers' or 'editors' and is case-sensitive
			const res = await axios.get(gState.url + `/${collection}/` + user.uid);
			const targetUser = await res.data.data;
			console.log(collection, targetUser, targetUser.length);
			if (user.userEmail === undefined) {
				console.log('no User Email');
			} else if (targetUser.length === 0) {
				console.log();
				throw new Error(
					`No ${p.singular(collection)} account exists for ${
						user.userEmail
					}. Please try another account type or create a new account.`
				);
			} else {
				window.localStorage.setItem(
					'userType',
					JSON.stringify(p.singular(collection))
				);
				setGState({ ...gState, userType: p.singular(collection) });
				return collection;
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

			console.log('handle', user.userType);

			let newUser;

			switch (user.userType) {
				case 'Writer':
					newUser = {
						uid: newUserObject.user.uid,
						userEmail: newUserObject.user.email,
						userType: user.userType,
					};
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
				case 'demo':
					newUser = {
						uid: newUserObject.user.uid,
						userEmail: newUserObject.user.email,
						userType: 'writer',
						isDemo: true,
					};
					await addUserToWritersCollection(newUser, gState.url);
					break;
				default:
					newUser = null;
			}

			window.localStorage.setItem('uid', JSON.stringify(newUser.uid));
			window.localStorage.setItem('email', JSON.stringify(newUser.userEmail));
			window.localStorage.setItem('userType', JSON.stringify(newUser.userType));

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
		try {
			// validate emails
			const newUserObject = await auth.signInWithEmailAndPassword(
				user.email,
				user.password
			);

			const newUser = {
				uid: newUserObject.user.uid,
				userEmail: newUserObject.user.email,
			};

			let writer = await checkCollectionForUser(newUser, 'writers');
			let editor = await checkCollectionForUser(newUser, 'editors');

			if (writer) newUser.userType = p.singular(writer);
			if (editor) newUser.userType = p.singular(editor);

			if (gState.errorDropdown === null) {
				window.localStorage.setItem('uid', JSON.stringify(newUser.uid));
				window.localStorage.setItem('email', JSON.stringify(newUser.userEmail));
				setGState({
					...gState,
					uid: newUser.uid,
					userEmail: newUser.userEmail,
					userType: newUser.userType,
				});
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
		window.localStorage.setItem('uid', JSON.stringify(null));
		window.localStorage.setItem('email', JSON.stringify(null));
		window.localStorage.setItem('userType', JSON.stringify(null));
		setGState(initialGState);
	};

	let successMessage = '';

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

	const handlePasswordReset = async (resetUser) => {
		await handleSendPasswordResetEmail(resetUser);
		return true;
	};

	useEffect(() => {
		// calls this onStateChanged any time uid in gState changes
		auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				const cUser = {
					uid: JSON.parse(window.localStorage.getItem('uid')),
					userEmail: JSON.parse(window.localStorage.getItem('email')),
					userType: JSON.parse(window.localStorage.getItem('userType')),
				};

				setGState({
					...gState,
					uid: cUser.uid,
					userEmail: cUser.userEmail,
					userType: cUser.userType,
				});
			} else {
				setGState(initialGState);
			}
		});
	}, []);

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
									<Home {...rp} handleSignUp={handleSignUp} />
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
										handleSignUp={handleSignUp}
									/>
								</>
							)}
						/>

						<Route path='/about' render={(rp) => <About {...rp} />} />

						<Route
							path='/submissionchecklist'
							render={(rp) => <SubmissionChecklist />}
						/>

						<Route
							path='/submissionform'
							render={(rp) => <SubmissionForm {...rp} />}
						/>

						<Route path='/storage' render={(rp) => <StorageTest {...rp} />} />

						<Route path='/editors' render={(rp) => <AllEditors {...rp} />} />

						<Route path='/faq' render={(rp) => <FAQ {...rp} />} />

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
				<footer>
					<Footer />
				</footer>
			</div>
		</GlobalCtx.Provider>
	);
};

export default App;
