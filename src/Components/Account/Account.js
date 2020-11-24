import React, { useContext, useState } from 'react';
import './Account.scss';
import { GlobalCtx } from '../../App';
import SendPasswordResetEmail from '../Forms/SendPasswordResetEmail/SendPasswordResetEmail';
import EditorAssignments from '../EditorAssignments/EditorAssignments';
import EditorAccountFields from '../Forms/EditorAccountFields/EditorAccountFields';

const Account = ({ handleSendPasswordResetEmail, successMessage }) => {
	const { gState } = useContext(GlobalCtx);
	const { userType, userEmail } = gState;

	const [updating, setUpdating] = useState(false);
	const [forgetPasswordToggle, setForgetPasswordToggle] = useState(false);
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleEditorUpdateSubmit = () => {};

	const toggleForgetPassword = () => {
		setForgetPasswordToggle(!forgetPasswordToggle);
	};

	const editorProfilePage = (
		<>
			<EditorAssignments />
			<EditorAccountFields
				handleChange={handleChange}
				formData={formData}
				setFormData={setFormData}
			/>
		</>
	);

	const loggedIn = (
		<>
			<br></br>
			<h2 className='title is-2'>My Account</h2>
			<h4 className='welcome-msg subtitle is-4'>Welcome {userEmail}!</h4>
			<h5 className='subtitle is-5'>
				Account type: <span className='user-type'>{userType}</span>
			</h5>
			{successMessage}
			{forgetPasswordToggle ? (
				<SendPasswordResetEmail
					handleSendPasswordResetEmail={handleSendPasswordResetEmail}
					toggleForgetPassword={toggleForgetPassword}
				/>
			) : (
				<button
					className='button is-small is-ghost'
					onClick={() => toggleForgetPassword()}>
					Reset Password
				</button>
			)}
			{userType === 'editor' ? (
				updating ? (
					<form className='auth-form' onSubmit={handleEditorUpdateSubmit}>
						<h4 className='title is-4'>Update Profile Info</h4>
						<EditorAccountFields
							handleChange={handleChange}
							formData={formData}
							setFormData={setFormData}
						/>
					</form>
				) : (
					<EditorAssignments />
				)
			) : updating ? (
				<form></form>
			) : (
				<div>Writing Submissions</div>
			)}
		</>
	);

	const loggedOut = (
		<>
			{userEmail}
			<p>Please sign up and log in to access your red-ink account.</p>
		</>
	);

	const pageContent = userEmail ? loggedIn : loggedOut;

	return <div className='account-page'>{pageContent}</div>;
};

export default Account;
