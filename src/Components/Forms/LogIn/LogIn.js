import React, { useState, useContext } from 'react';
import './LogIn.scss';
// import { GlobalCtx } from '../../App';
import { Link } from 'react-router-dom';

const LogIn = ({ handleLogIn, history }) => {
	const emptyForm = {
		email: '',
		password: '',
		userType: '',
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = {
				email: formData.email,
				password: formData.password,
				userType: formData.userType,
			};
			const loggedIn = await handleLogIn(newUser);

			if (loggedIn === true) {
				history.push('/account');
			}
		} catch (error) {
			alert(error);
			setFormData(emptyForm);
		}
	};

	return (
		<div className='sign-up-page'>
			<h2>Log In</h2>
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
					type='password'
					name='password'
					value={formData.password}
					placeholder='Password'
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
				<input type='submit' className='button is-primary' value='Sign In' />
			</form>
		</div>
	);
};

export default LogIn;
