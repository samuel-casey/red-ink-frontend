import React, { useState, useContext } from 'react';
import './SignUp.scss';
// import { GlobalCtx } from '../../App';
import { Link } from 'react-router-dom';

const SignUp = ({ handleSignUp, history }) => {
	const emptyForm = {
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			formData.email === formData.confirmEmail &&
			formData.password === formData.confirmPassword
		) {
			const newUser = { email: formData.email, password: formData.password };
			handleSignUp(newUser);
			history.push('/editor/account');
		} else {
			alert(
				'Woops! Looks like your emails or passwords do not match. Please try again.'
			);
			setFormData(emptyForm);
		}
	};

	const editorFields = formData.userType === 'Editor' ? 'Stuff' : null;

	return (
		<div className='sign-up-page'>
			<h2>Sign Up for red ink</h2>
			<form onSubmit={handleSubmit} className='auth-form'>
				<input
					className='input'
					type='text'
					name='email'
					value={formData.email}
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='text'
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
				<div onChange={handleRadioChange}>
					<h3>Account Type</h3>
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
				<input type='submit' className='button is-primary' value='Sign Up' />
			</form>
		</div>
	);
};

export default SignUp;
