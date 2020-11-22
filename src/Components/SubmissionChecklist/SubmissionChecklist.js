import React from 'react';
import './SubmissionChecklist.scss';

const SubmissionChecklist = () => {
	return (
		<div className='submission-checklist-container'>
			<div className='instructions-img-container'>
				<img
					src='https://res.cloudinary.com/scimgcloud/image/upload/v1606077424/red-ink/gDocsChangeSettings_o1gw8u.png'
					alt='change-settings-img'
				/>
			</div>
			<div className='instructions-img-container'>
				<img
					src='https://res.cloudinary.com/scimgcloud/image/upload/v1606077556/red-ink/gDocsChangeSettings_ww6azr.png'
					alt='change-img'
				/>
			</div>
			<div className='instructions-img-container'>
				<img
					src='https://res.cloudinary.com/scimgcloud/image/upload/v1606077424/red-ink/gDocsCommenterDropdown_dd42aw.png'
					alt='commenter-dropdown-img'
				/>
			</div>
			<div className='instructions-img-container'>
				<img
					src='https://res.cloudinary.com/scimgcloud/image/upload/v1606077466/red-ink/gDocsGetShareLink_seuqz7.png'
					alt='copy-link-img'
				/>
			</div>
		</div>
	);
};

export default SubmissionChecklist;
