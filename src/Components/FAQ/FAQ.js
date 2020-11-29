import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const questionsAndAnswers = [
		{
			question: 'How does red ink vet its editors?',
			answer:
				"Anyone can be an editor. It's up to writers to judge whether or not an editor would be a good fit for them using the information provided about each editor on the Editors page.",
		},
		{
			question: 'Will editors know when I submit my assignment to them?',
			answer:
				'Yes. Every time you submit an assignment to an Editor, they get an email notification. You can also remind your editor that you sent them a document from your account page once after submission for each submission you make.',
		},
		{
			question:
				"As an Editor, how do writers know when I've completed edits for their assignment?",
			answer:
				"Editors can notify writers that they have completed editing their document on the Account page by setting the assignment's status to 'Complete' and pressing the 'Notify Writer' button.",
		},
		{
			question: 'More Questions?',
			answer: 'Email red.ink.user.help@gmail.com for support.',
		},
	];

	const collapsedClass = isCollapsed ? 'collapsed' : 'expanded';

	const content = questionsAndAnswers.map((item, index) => (
		<div className='question-container' key={index}>
			<div className='question'>
				<span className='question-number'>{index + 1})</span>
				<p
					className='question-text'
					onClick={() => setIsCollapsed(!isCollapsed)}>
					{item.question}
				</p>
			</div>
			<p className='answer'>{item.answer}</p>
		</div>
	));

	console.log(content);

	return <div className='FAQ-page'>{content}</div>;
};

export default FAQ;
