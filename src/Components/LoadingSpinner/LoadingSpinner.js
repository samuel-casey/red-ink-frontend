import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ msg }) => {
	return (
		<div className='loading-container'>
			<h5 className='subtitle is-5'>{msg}</h5>
			<button className='button is-loading is-info loading-spinner' disabled>
				{' '}
			</button>
		</div>
	);
};

export default LoadingSpinner;
