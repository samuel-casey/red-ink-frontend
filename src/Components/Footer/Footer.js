import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { GlobalCtx } from '../../App';

const Footer = () => {
	const { gState } = useContext(GlobalCtx);
	const { errorDropdown } = gState;

	return (
		<>
			<p className='error-message'>
				{errorDropdown ? (
					<span>
						<span>
							Woops! Looks like there was an error. Check the top of the screen
							for more detail
						</span>{' '}
						<i className='fas fa-sort-up'></i>
					</span>
				) : null}
			</p>
			<div id='footer-container'>
				<Link to='/faq' target='blank'>
					FAQ
				</Link>
				<a
					href='mailto:red.ink.user.help@gmail.com'
					target='_blank'
					rel='noopener noreferrer'
					className='tooltip'>
					Contact Us or Report a Bug
					<span className='tooltip-text'>red.ink.user.help@gmail.com</span>
				</a>
				<a href='https://samcasey.info' target='blank'>
					About the developer
				</a>
			</div>
		</>
	);
};

export default Footer;
