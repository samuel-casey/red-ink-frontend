import React from 'react';
import './NoSubmissionsMsg.scss';
import { Link } from 'react-router-dom';

const NoSubmissionsMsg = ({ userType }) => {
	const editorsMsg =
		userType === 'editor' ? (
			<p>
				Looks like you have not been asked to edit anything yet! Monitor your
				email inbox for updates from{' '}
				<span className='email'>red.ink.edit.requests@gmail.com</span>. You will
				receive an email when someone requests your services.
			</p>
		) : (
			<>
				<p>
					Looks like you have not submitted any writing for editing yet! Proceed
					to the editors page to request edits.{' '}
				</p>
				<Link to='/editors' className='button is-primary editors-page-link'>
					Editors Page
					<i className='fas fa-angle-double-right'></i>
				</Link>
			</>
		);

	return editorsMsg;
};

export default NoSubmissionsMsg;
