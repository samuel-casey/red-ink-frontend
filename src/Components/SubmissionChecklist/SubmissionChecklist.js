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
		},
		{
			number: 2,
			checked: false,
			text: 'Select "Change" underneath the "Get link" icon.',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077556/red-ink/gDocsChangeSettings_ww6azr.png',
		},
		{
			number: 3,
			checked: false,
			text:
				'Click the arrow and choose "Commenter" from the list so that your editor can leave comments and suggestions on your document.',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077424/red-ink/gDocsCommenterDropdown_dd42aw.png',
		},
		{
			number: 4,
			checked: false,
			text:
				'Click "Done" below the dropdown list, and click "Copy link" to the right of the green box to copy your shareable link to the clipboard. Return to red ink to share your link with your editor!',
			imgUrl:
				'https://res.cloudinary.com/scimgcloud/image/upload/v1606077466/red-ink/gDocsGetShareLink_seuqz7.png',
		},
	]);

	const handleClick = (boxIndex) => {
		const newBoxes = [...checked];
		console.log(Array.isArray(checked));
		newBoxes[boxIndex].checked = !newBoxes[boxIndex].checked;
		setChecked(newBoxes);
	};

	const completeClass = 'checkbox complete';
	const incompleteClass = 'checkbox incomplete';

	const emptyBox = 'fas fa-square';
	const checkedBox = 'fas fa-check-square';

	let enabledRoute;
	let enabledClass;
	let enabledText;
	let enabledIcon;

	if (checked.filter((item) => item.checked === true).length === 4) {
		enabledRoute = '/submissionform';
		enabledText = 'Proceed to submit writing';
		enabledClass = 'enabled';
		enabledIcon = <i className='fas fa-angle-double-right'></i>;
	} else {
		enabledRoute = '/submissionchecklist';
		enabledText = 'Complete all steps to proceed';
		enabledClass = 'disabled';
		enabledIcon = '';
	}

	const instructions = checked.map((item) => (
		<>
			<div className='instructions-text' key={item.number}>
				<div
					box-number={item.number.toString()}
					onClick={() => handleClick(item.number - 1)}
					className={item.checked ? completeClass : incompleteClass}>
					<i className={item.checked ? checkedBox : emptyBox}></i>
				</div>
				<p>{item.text}</p>
			</div>
			<div className='instructions-img-container'>
				<img src={item.imgUrl} alt={`img-${item.number}`} />
			</div>
		</>
	));

	return (
		<>
			<p id='instructions-intro'>Instructions intro</p>
			<div className='submission-checklist-container'>{instructions}</div>
			<button className={`button is-primary proceed-button ${enabledClass}`}>
				<Link to={enabledRoute}>
					{enabledText}
					{enabledIcon}
				</Link>
			</button>
		</>
	);
};

export default SubmissionChecklist;
