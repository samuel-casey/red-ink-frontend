import React, { useContext } from 'react';
import './EditorCard.scss';
import { GlobalCtx } from '../../App';

const EditorCard = ({
	email,
	about_me,
	uid,
	area_of_expertise,
	first_name,
	last_name,
	twitter_url,
	linkedin_url,
	profile_img_url,
	history,
}) => {
	const { gState, setGState } = useContext(GlobalCtx);

	const handleRequestEditsClick = () => {
		const editorEmail = email;
		const editorUid = uid;
		setGState({
			...gState,
			editorEmail: editorEmail,
			editorUid: editorUid,
			editorFirstName: first_name,
			editorLastName: last_name,
		});
		history.push('/submissionchecklist');
	};

	const twitterIcon =
		twitter_url !== '' ? (
			<a target='blank' href={twitter_url}>
				<i className='fab fa-twitter'></i>
			</a>
		) : null;

	const linkedInIcon =
		linkedin_url !== '' ? (
			<a target='blank' href={linkedin_url}>
				<i className='fab fa-linkedin-in'></i>
			</a>
		) : null;

	return (
		<div className='card editor-card'>
			<div className='card-image'>
				<div className='editor-bg-block'></div>
				<figure className='image is-96x96'>
					<img
						className='is-rounded'
						src={profile_img_url}
						alt='Editor Profile Picture'
					/>
				</figure>
			</div>
			<h3 className='editor-name title is-3'>
				{first_name} {last_name}
			</h3>
			<h5 className='editor-area-of-expertise subtitle is-5'>
				{area_of_expertise}
			</h5>
			<div className='card-content'>
				<div className='media'>
					<div className='media-content'>
						{linkedInIcon}

						{twitterIcon}
					</div>
				</div>
				<div className='content'>
					<h6 className='subtitle about-me-heading'>About {first_name}</h6>
					{about_me}
					<br />
				</div>
				<button
					className='button is-primary request-edits'
					onClick={handleRequestEditsClick}>
					Request Edits
				</button>
			</div>
		</div>
	);
};

export default EditorCard;
