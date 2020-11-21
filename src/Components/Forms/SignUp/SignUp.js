import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import './SignUp.scss';

const SignUp = ({ handleSignUp, history }) => {
	const { gState, setGState } = useContext(GlobalCtx);

	const emptyForm = {
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		userType: '',
		firstName: '',
		lastName: '',
		aboutMe: '',
		profileImgUrl: '',
		linkedInUrl: '',
		twitterUrl: '',
	};

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		console.log(formData);
		setFormData({ ...formData, [key]: value });
	};

	const handleRadioChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const validateSignUpFields = (fields) => {
		let errorMessage;

		// check that emails and passwords match their confirms
		if (
			fields.password !== fields.confirmPassword ||
			fields.email !== fields.confirmEmail
		) {
			errorMessage =
				'Woops! Check that your emails and passwords match and try again';
		}

		// check that all additional Editor fields filled out if account type is Editor
		if (fields.userType === 'Editor') {
			if (
				fields.email === '' ||
				fields.confirmEmail === '' ||
				fields.password === '' ||
				fields.confirmPassword === '' ||
				fields.aboutMe === '' ||
				fields.profileImgUrl === '' ||
				fields.firstName === '' ||
				fields.lastName === ''
			) {
				errorMessage = 'Please fill out all form fields';
			} else {
				errorMessage = null;
			}

			// check that all fields filled out if Writer selected
		} else if (fields.userType === 'Writer') {
			if (
				fields.email === '' ||
				fields.confirmEmail === '' ||
				fields.password === '' ||
				fields.confirmPassword === ''
			) {
				errorMessage = 'Please fill out all form fields';
			} else {
				errorMessage = null;
			}

			// if no account type selected, tell user to pick one
		} else {
			errorMessage = 'Please select an account type';
		}
		return errorMessage;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = {
				email: formData.email,
				confirmEmail: formData.confirmEmail,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
				userType: formData.userType,
				aboutMe: formData.aboutMe,
				firstName: formData.firstName,
				lastName: formData.lastName,
				profileImgUrl: formData.profileImgUrl,
				linkedInUrl: formData.linkedInUrl,
				twitterUrl: formData.twitterUrl,
			};

			const errorMessage = await validateSignUpFields(formData);
			let signedUp;

			if (!errorMessage) {
				signedUp = await handleSignUp(newUser);
			} else {
				throw new Error(errorMessage);
			}

			if (signedUp === true) {
				history.push('/account');
			}
		} catch (error) {
			setGState({
				...gState,
				errorDropdown: error.message,
			});
		}
	};

	const editorFields =
		formData.userType === 'Editor' ? (
			<div className='extra-editor-fields'>
				<>
					<label htmlFor='firstName'>First name</label>
					<input
						className='input'
						name='firstName'
						value={formData.firstName}
						placeholder='Link to LinkedIn profile (optional)'
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='linkedInUrl'>Last name</label>
					<input
						className='input'
						name='lastName'
						value={formData.lastName}
						placeholder='Link to LinkedIn profile (optional)'
						onChange={handleChange}
					/>
					<br />
					<label>About You</label>
					<textarea
						className='textarea'
						name='aboutMe'
						value={formData.aboutMe}
						placeholder='Describe yourself in a few sentences so writers know why they should ask you to edit their writing!'
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='linkedInUrl'>LinkedIn</label>
					<input
						className='input'
						name='linkedInUrl'
						value={formData.linkedInUrl}
						placeholder='Link to LinkedIn profile (optional)'
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='twitterUrl'>Twitter</label>
					<input
						className='input'
						name='twitterUrl'
						value={formData.twitterUrl}
						placeholder='Link to twitter profile (optional)'
						onChange={handleChange}
					/>
				</>
				<br />
				<label htmlFor='profileImgUrl'>Profile Picture</label>
				<input
					type='text'
					name='profileImgUrl'
					className='avatars-input input'
					value={formData.profileImgUrl}
					list='avatars'
					placeholder='Enter a link to your profile picture, or select a default'
					onChange={handleChange}
				/>
				<div className='default-avatars'>
					<div className='default-avatar-container'>
						<span>Default Picture 1</span>
						<br />
						<img
							src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png'
							alt='default-avatar-1'
							className='avatar-img'
						/>
						<br />
						<button
							type='button'
							className='button is-small is-success'
							onClick={() =>
								setFormData({
									...formData,
									profileImgUrl:
										'https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png',
								})
							}>
							Select
						</button>
					</div>
					<div className='default-avatar-container'>
						<span>Default Picture 2</span>
						<br />
						<img
							src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png'
							alt='default-avatar-2'
							value='Default Picture 2'
							className='avatar-img'
							onClick={() => {
								setFormData({
									...formData,
									profileImgUrl:
										'https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png',
								});
							}}
						/>
						<br />
						<button
							type='button'
							className='button is-small is-success'
							onClick={() =>
								setFormData({
									...formData,
									profileImgUrl:
										'https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png',
								})
							}>
							Select
						</button>
					</div>
				</div>
			</div>
		) : null;

	return (
		<div className='sign-up-page'>
			<br></br>
			<h3 className='title is-3'>
				Sign Up for red ink{' '}
				{formData.userType !== '' ? (
					<span className='heading-user-type'>
						{formData.userType.toLowerCase()}
					</span>
				) : null}
			</h3>
			<form onSubmit={handleSubmit} className='auth-form'>
				<input
					className='input'
					type='email'
					name='email'
					value={formData.email}
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='email'
					name='confirmEmail'
					value={formData.confirmEmail}
					placeholder='Confirm Email'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='password'
					name='password'
					value={formData.password}
					placeholder='Password'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='password'
					name='confirmPassword'
					value={formData.confirmPassword}
					placeholder='Confirm Password'
					onChange={handleChange}
				/>
				<div className='radio-container' onChange={handleRadioChange}>
					<p className='user-type-label'>Account Type</p>
					<label className='radio'>
						<input type='radio' name='userType' value='Writer' />
						Writer
					</label>
					<label className='radio'>
						<input type='radio' name='userType' value='Editor' />
						Editor
					</label>
				</div>
				{editorFields}
				<br />
				<input type='submit' className='button is-primary' value='Sign Up' />
			</form>
		</div>
	);
};

export default SignUp;
