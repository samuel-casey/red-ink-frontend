import React, { useContext, useEffect, useState } from 'react';
import './Account.scss';
import { GlobalCtx } from '../../App';
import SendPasswordResetEmail from '../Forms/SendPasswordResetEmail/SendPasswordResetEmail';
import EditorAssignments from '../EditorAssignments/EditorAssignments';
import EditorAccountFields from '../Forms/EditorAccountFields/EditorAccountFields';
import {
	getSingleEditor,
	updateEditorData,
} from '../../apiHelpers/editorsHelpers';
import EditorCard from '../EditorCard/EditorCard';
import WriterSubmissions from '../WriterSubmissions/WriterSubmissions';
import NotAuthenticatedMsg from '../NotAuthenticateMsg/NotAuthenticatedMsg';
import { createFirebaseStorageURL } from '../../apiHelpers/storage';

const Account = ({
	handleSendPasswordResetEmail,
	successMessage,
	handleSignUp,
	history,
	location,
}) => {
	const { gState } = useContext(GlobalCtx);
	const { userType, uid, url } = gState;

	const userEmail =
		gState.userEmail && gState.userEmail.includes('@red-ink.app')
			? 'to the demo'
			: gState.userEmail;

	const [updating, setUpdating] = useState(false);
	const [forgetPasswordToggle, setForgetPasswordToggle] = useState(false);
	const [editorAccountData, setEditorAccountData] = useState({});
	const [profilePreview, setProfilePreview] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		areaOfExpertise: '',
		aboutMe: '',
		linkedInUrl: '',
		twitterUrl: '',
		profileImgUrl: '',
	});

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleFileChange = async (e) => {
		const newFileUrl = await createFirebaseStorageURL(e.target.files[0]);
		setFormData({ ...formData, profileImgUrl: newFileUrl });
	};

	const getProfileData = async (url, uid) => {
		const editorData = await getSingleEditor(url, uid);
		const editorDataMap = {
			firstName: editorData[0].first_name,
			lastName: editorData[0].last_name,
			areaOfExpertise: editorData[0].area_of_expertise,
			aboutMe: editorData[0].about_me,
			linkedInUrl: editorData[0].linkedin_url,
			twitterUrl: editorData[0].twitter_url,
			profileImgUrl: editorData[0].profile_img_url,
		};
		return editorDataMap;
	};

	const toggleProfilePreview = async () => {
		const profileData = await getProfileData(url, uid);
		setEditorAccountData(profileData);
		setProfilePreview(!profilePreview);

		setForgetPasswordToggle(false);
	};

	const handleEditorUpdateSubmit = async (e) => {
		e.preventDefault();
		const updatedEditor = await updateEditorData(url, uid, formData);
		if (updatedEditor) {
			setUpdating(false);
		}
	};

	const toggleForgetPassword = () => {
		setForgetPasswordToggle(!forgetPasswordToggle);
		setProfilePreview(false);
	};

	const toggleUpdating = async () => {
		setUpdating(!updating);
		const currentProfileData = await getProfileData(url, uid);
		setFormData(currentProfileData);
		setForgetPasswordToggle(false);
	};

	useEffect(() => {
		if (userType === 'Editor') {
			let editorData;
			const loadEditor = async () => {
				editorData = await getSingleEditor(url, uid);
				const editorDataMap = {
					firstName: editorData[0].first_name,
					lastName: editorData[0].last_name,
					areaOfExpertise: editorData[0].area_of_expertise,
					aboutMe: editorData[0].about_me,
					linkedInUrl: editorData[0].linkedin_url,
					twitterUrl: editorData[0].twitter_url,
					profileImgUrl: editorData[0].profile_img_url,
				};
				setEditorAccountData(editorDataMap);
				setFormData(editorDataMap);
			};
			loadEditor();
		}
	}, []);

	const loggedIn = (
		<>
			<br></br>
			<h2 className='title is-2'>
				{userEmail === 'to the demo' ? 'Demo' : 'My'} Account
			</h2>
			<h4 className='welcome-msg subtitle is-4'>Welcome {userEmail}!</h4>
			<h5 className='subtitle is-5'>
				Account type: <span className='user-type'>{userType}</span>
			</h5>
			{successMessage}

			{/* render button to change whether editing assignments or profile update form is showing is userType === editor */}
			<div className='change-profile-sections'>
				{userType && userType.toLowerCase() === 'editor' ? (
					updating ? (
						<button
							className='button is-primary is-small'
							onClick={toggleUpdating}>
							View Editing Assignments
						</button>
					) : (
						<button
							className='button is-primary is-small'
							onClick={toggleUpdating}>
							Update Profile Info
						</button>
					)
				) : null}

				{/* render button to toggle profile preview if user is an editor,
				otherwise render nothing */}
				{userType && userType.toLowerCase() === 'editor' ? (
					profilePreview ? (
						<>
							<button
								className='button is-primary is-small'
								onClick={() => toggleProfilePreview()}>
								Hide Profile Preview
							</button>
							<EditorCard
								email={editorAccountData.email}
								about_me={editorAccountData.aboutMe}
								uid={editorAccountData.uid}
								area_of_expertise={editorAccountData.areaOfExpertise}
								first_name={editorAccountData.firstName}
								last_name={editorAccountData.lastName}
								twitter_url={editorAccountData.twitterUrl}
								linkedin_url={editorAccountData.linkedInUrl}
								profile_img_url={editorAccountData.profileImgUrl}
								location={location}
							/>
						</>
					) : (
						<button
							className='button is-primary is-small'
							onClick={() => toggleProfilePreview()}>
							Show Profile Preview
						</button>
					)
				) : null}

				{/* render form to reset password if forgetPasswordToggle set to true */}
				{forgetPasswordToggle ? (
					<SendPasswordResetEmail
						handleSendPasswordResetEmail={handleSendPasswordResetEmail}
						toggleForgetPassword={toggleForgetPassword}
					/>
				) : updating || userEmail === 'to the demo' ? (
					''
				) : (
					<button
						className='button is-small is-ghost'
						onClick={() => toggleForgetPassword()}>
						Reset Password
					</button>
				)}
			</div>

			{/* render editor update form if user type === editor and updating === true */}
			{userType && userType.toLowerCase() === 'editor' ? (
				updating ? (
					<form className='auth-form' onSubmit={handleEditorUpdateSubmit}>
						<h4 className='title is-4'>Update Profile Info</h4>
						<button
							className='button is-warning is-light save-updates'
							type='submit'>
							Save Updates <i className='far fa-save'></i>
						</button>
						<br />
						<EditorAccountFields
							handleChange={handleChange}
							handleFileChange={handleFileChange}
							formData={formData}
							setFormData={setFormData}
						/>
						<button
							className='button is-warning is-light save-updates'
							type='submit'>
							Save Updates <i className='far fa-save'></i>
						</button>
					</form>
				) : (
					<EditorAssignments />
				)
			) : (
				<WriterSubmissions />
			)}
		</>
	);

	const loggedOut = (
		<>
			<NotAuthenticatedMsg
				pageMsg={'the account page.'}
				handleSignUp={handleSignUp}
				history={history}
			/>
		</>
	);

	const pageContent = userEmail ? loggedIn : loggedOut;

	return <div className='account-page'>{pageContent}</div>;
};

export default Account;
