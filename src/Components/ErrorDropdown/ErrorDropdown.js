import React, { useContext } from 'react';
import { GlobalCtx } from '../../App';
import './ErrorDropdown.scss';

const ErrorDropdown = () => {
	const { gState, setGState } = useContext(GlobalCtx);

	const errorClass = gState.errorDropdown ? 'error-visible' : 'error-hidden';

	return (
		<div className={`error-dropdown ${errorClass}`}>
			<p>{gState.errorDropdown}</p>
			<button
				className='button is-danger'
				onClick={() => {
					setGState({ ...gState, errorDropdown: null });
					document.location.reload();
				}}>
				<i className='fas fa-times'></i>
			</button>
		</div>
	);
};

export default ErrorDropdown;
