import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import EditorAccountFields from '../EditorAccountFields/EditorAccountFields';
import './SignUp.scss';

const SignUp = ({ handleSignUp, history }) => {
	const { gState, setGState } = useContext(GlobalCtx);
	const [isLoading, setIsLoading] = useState(false);

	const emptyForm = {
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		userType: '',
		firstName: '',
		lastName: '',
		aboutMe: '',
		areaOfExpertise: '',
		profileImgUrl: '',
		linkedInUrl: '',
		twitterUrl: '',
	};

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
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
				fields.areaOfExpertise === '' ||
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
				areaOfExpertise: formData.areaOfExpertise,
				firstName: formData.firstName,
				lastName: formData.lastName,
				profileImgUrl: formData.profileImgUrl,
				linkedInUrl: formData.linkedInUrl,
				twitterUrl: formData.twitterUrl,
			};

			const errorMessage = await validateSignUpFields(formData);
			let signedUp;

			if (!errorMessage) {
				setIsLoading(true);
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
			<EditorAccountFields
				handleChange={handleChange}
				formData={formData}
				setFormData={setFormData}
			/>
		) : null;

	return (
		<div className='sign-up-log-in-bg'>
			<div className='sign-up-log-in-page'>
				<br></br>
				<h3 className='title is-3'>
					Sign Up{' '}
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
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<>
							<br />{' '}
							<input
								type='submit'
								className={`button is-primary`}
								value='Sign Up'
							/>
						</>
					)}
				</form>
			</div>
		</div>
	);
};

export default SignUp;
