import React from 'react';
import './FAQ.scss';

const FAQ = () => {
	const questionsAndAnswers = [
		{
			question: 'How does red ink vet its editors?',
			answer:
				"Right now, anyone can be an editor. It's up to writers to judge whether or not an editor would be a good fit for them using the information provided about each editor on the Editors page.",
		},
		{
			question: 'How much does red ink cost?',
			answer:
				"Right now, it's $free.99, but that won't last for long. Editors gotta eat too!",
		},
	];

	const content = questionsAndAnswers.map((item, index) => (
		<div className='question-container' key={index}>
			<div className='question'>
				<span className='question-number'>{index + 1})</span>
				<p className='question-text'>{item.question}</p>
			</div>
			<p className='answer'>{item.answer}</p>
		</div>
	));

	console.log(content);

	return <div className='FAQ-page'>{content}</div>;
};

export default FAQ;
