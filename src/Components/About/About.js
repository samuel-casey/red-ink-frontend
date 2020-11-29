import React from 'react';
import './About.scss';

const About = () => {
	return (
		<article className='about-main'>
			<div className='about-page'>
				<br />
				<h2 className='title is-2'>
					About <span className='app-name'>red ink</span>
				</h2>
				<br />
				<h4 className='title is-4'>Background</h4>
				<p>
					<span className='app-name'>red ink</span> is a platform for connecting
					students, bloggers, and other people looking to improve their writing
					with editors who have specific types of knowledge. The goal of{' '}
					<span className='app-name'>red ink</span> is to help people improve
					the content, style and tone of their writing. The idea was born out of
					a student's frustration with finding people besides their professors
					to provide feedback on more than just grammar, spelling and
					punctuation for their writing.
				</p>
				<br />
				<h4 className='title is-4'>Technology</h4>
				<p>
					<a target='blank' href='https://samcasey.info'>
						Sam Casey
					</a>{' '}
					is the lead developer and maintainer of{' '}
					<span className='app-name'>red ink</span>. The current version of{' '}
					<span className='app-name'>red ink</span> was built in a week using
					React, TypeScript, Express, and Google Firestore as a passion project.
					In the future, Sam hopes to add more features such as:
					<ul>
						<li>A rich-text editor</li>
						<li>In-app messaging</li>
						<li>
							The ability to upload Word documents straight to the platform
						</li>
						<li>Payments for Editors</li>
					</ul>
				</p>
				<br />
				<h4 className='title is-4'>Support</h4>
				<p>
					For help with any questions you may have about{' '}
					<span className='app-name'>red ink</span>, please reach out to{' '}
					<a href='mailto:red.ink.user.help@gmail.com'>
						red.ink.user.help@gmail.com.
					</a>
				</p>
			</div>
		</article>
	);
};

export default About;
