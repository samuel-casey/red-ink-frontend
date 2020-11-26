import React from 'react';

const DemoButton = ({ handleLogIn, history }) => {
	const handleClick = async () => {
		await handleLogIn({
			email: 'demoWriter@red-ink.app',
			password: 'demoWriter',
		});
		history.push('/account');
	};

	return (
		<button className='button is-success' onClick={handleClick}>
			Demo
		</button>
	);
};

export default DemoButton;
