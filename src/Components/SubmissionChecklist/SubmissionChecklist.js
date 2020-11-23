import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubmissionChecklist.scss';

const SubmissionChecklist = () => {
	// need to add elements to a checked list piece of state
	const [checked, setChecked] = useState([
		{
			number: 1,
			checked: false,
			text:
				'Click the "Share" button in the upper righthand corner of your document.',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077424/red-ink/gDocsChangeSettings_o1gw8u.png',
			classNameEnabled: true,
			hrClass: true,
		},
		{
			number: 2,
			checked: false,
			text: 'Select "Change" underneath the "Get link" icon.',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077556/red-ink/gDocsChangeSettings_ww6azr.png',
			classNameEnabled: true,
			hrClass: true,
		},
		{
			number: 3,
			checked: false,
			text:
				'Click the arrow and choose "Commenter" from the list so that your editor can leave comments and suggestions on your document.',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077424/red-ink/gDocsCommenterDropdown_dd42aw.png',
			classNameEnabled: true,
			hrClass: true,
		},
		{
			number: 4,
			checked: false,
			text:
				'Click "Done" below the dropdown list, and click "Copy link" to the right of the green box to copy your shareable link to the clipboard. Return to red ink to share your link with your editor!',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077466/red-ink/gDocsGetShareLink_seuqz7.png',
			classNameEnabled: true,
			hrClass: false,
		},
	]);

	const handleClick = (boxIndex) => {
		const newBoxes = [...checked];
		console.log(Array.isArray(checked));
		newBoxes[boxIndex].checked = !newBoxes[boxIndex].checked;
		newBoxes[boxIndex].classNameEnabled = !newBoxes[boxIndex].classNameEnabled;
		setChecked(newBoxes);
	};

	const completeClass = 'checkbox complete';
	const incompleteClass = 'checkbox incomplete';

	const emptyBox = 'fas fa-square';
	const checkedBox = 'fas fa-check-square';

	const proceedButton =
		checked.filter((item) => item.checked === true).length === 4 ? (
			<button className={`button is-primary proceed-button enabled`}>
				<Link to='/submissionform'>
					Proceed to submit writing
					<i className='fas fa-angle-double-right'></i>
				</Link>
			</button>
		) : (
			<button className={`button is-primary proceed-button disabled`}>
				<Link to='/submissionchecklist'>Complete all steps to proceed</Link>
			</button>
		);

	const instructions = checked.map((item) => (
		<div className='instructions-container'>
			<div className='instructions-text' key={item.number}>
				<p>{item.number}.</p>
				<div
					box-number={item.number.toString()}
					onClick={() => handleClick(item.number - 1)}
					className={item.checked ? completeClass : incompleteClass}>
					<i className={item.checked ? checkedBox : emptyBox}></i>
				</div>
				<p className={item.classNameEnabled ? 'enabled' : 'disabled'}>
					{item.text}
				</p>
			</div>
			<div className='instructions-img-container'>
				<img
					src={item.imgUrl}
					alt={`img-${item.number}`}
					className={item.classNameEnabled ? 'enabled' : 'disabled'}
				/>
			</div>
			<hr className={item.hrClass ? 'hr-visible' : 'hr-invisible'}></hr>
		</div>
	));

	return (
		<div className='submissions-checklist-page'>
			<p id='instructions-intro'>
				<span id='red-ink-instructions'>red ink</span> currently utilizes Google
				Docs as an editing tool. In order to submit your writing to your editor,
				please take a moment to create a Google Doc, and check the 4 boxes below
				to enable sharing so that your editor can leave comments and suggestions
				on your writing!
			</p>
			<div className='submission-checklist-container'>{instructions}</div>
			{proceedButton}
		</div>
	);
};

export default SubmissionChecklist;
