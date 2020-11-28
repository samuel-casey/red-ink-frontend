import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const DemoButton = ({ handleLogIn, history }) => {
	const [loading, setLoading] = useState(false);
	const handleClick = async () => {
		setLoading(true);
		await handleLogIn({
			email: 'demoWriter@red-ink.app',
			password: 'demoWriter',
		});
		history.push('/account');
	};

	return loading ? (
		<>
			<button className='button is-success is-loading' onClick={handleClick}>
				Demo
			</button>
		</>
	) : (
		<button className='button is-success' onClick={handleClick}>
			Demo
		</button>
	);
};

export default DemoButton;
