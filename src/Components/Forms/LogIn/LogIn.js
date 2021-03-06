import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import './LogIn.scss';
import { Link } from 'react-router-dom';

const LogIn = ({ handleLogIn, history }) => {
	const emptyForm = {
		email: '',
		password: '',
		userType: '',
	};

	const { gState, setGState } = useContext(GlobalCtx);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
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
			setIsLoading(true);

			const loggedIn = await handleLogIn(newUser);

			if (loggedIn === true) {
				history.push('/account');
			}
		} catch (error) {
			setGState({ ...gState, errorDropdown: error.message });
			setFormData(emptyForm);
		}
	};

	return (
		<div className='sign-up-log-in-page'>
			<br></br>
			<h3 className='title is-3'>Log In</h3>
			<form onSubmit={handleSubmit} className='auth-form'>
				<label className='main-label' htmlFor='email'>
					Email
				</label>
				<input
					className='input'
					type='email'
					name='email'
					value={formData.email}
					placeholder='Email'
					onChange={handleChange}
				/>
				<label className='main-label' htmlFor='email'>
					Password
				</label>
				<input
					className='input'
					type='password'
					name='password'
					value={formData.password}
					placeholder='Password'
					onChange={handleChange}
				/>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<br />{' '}
						<input
							type='submit'
							className={`button is-primary`}
							value='Log In'
						/>
						<Link className='login-redirect' to='/resetpassword'>
							Forgot password?
						</Link>
						<br />
					</>
				)}
			</form>
		</div>
	);
};

export default LogIn;
