import React, { useContext, useState } from 'react';
import { seedDemoData } from '../../apiHelpers/submissionHelpers';
import { getDemoWriters } from '../../apiHelpers/writersHelpers';
import { GlobalCtx } from '../../App';

const DemoButton = ({ handleSignUp, history }) => {
	const { gState } = useContext(GlobalCtx);
	const { url } = gState;
	const [loading, setLoading] = useState(false);
	const handleClick = async () => {
		setLoading(true);

		const demoWriters = await getDemoWriters(url);
		const newDemoEmail = `demoWriter${demoWriters.length + 1}@red-ink.app`;

		await handleSignUp({
			email: newDemoEmail,
			password: 'demoWriter',
			userType: 'demo',
		});

		const demoWriterId = JSON.parse(window.localStorage.getItem('uid'));

		await seedDemoData(url, demoWriterId);

		// addded this extra push to Home because pushing straight to /account was causing the demo submissions not to load on time when the user hit the demo button while already on the /account route
		history.push('/');
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
