import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalCtx } from '../../App';
import './Header.scss';

const Header = () => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { uid } = gState;

	const [activeMenu, setActiveMenu] = useState(false);

	const toggleMenu = () => {
		setActiveMenu(!activeMenu);
	};

	const logOut = () => {
		console.log('loggedOut');
	};

	const menuClass = `navbar-burger burger ${activeMenu ? 'is-active' : ''}`;

	const loggedOut = (
		<nav className='navbar' role='navigation' aria-label='main navigation'>
			<div className='navbar-brand'>
				<Link className='navbar-item' to='/'>
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605818361/red-ink/logo2_transparent.png'
						alt='red-ink-logo'
					/>
				</Link>
			</div>

			<div
				id='navbarBasicExample'
				className={`navbar-menu ${activeMenu ? 'is-active' : ''}`}>
				<div className='navbar-start'>
					<Link to='/' className='navbar-item'>
						Home
					</Link>
					<Link to='/about' className='navbar-item'>
						About
					</Link>
					<Link to='/editors' className='navbar-item'>
						Editors
					</Link>
					<Link
						to='/editors'
						style={{
							display: activeMenu ? 'inherit' : 'none',
						}}
						className='navbar-item'>
						Sign Up
					</Link>
					<Link
						to='/editors'
						style={{
							display: activeMenu ? 'inherit' : 'none',
						}}
						className='navbar-item'>
						Log In
					</Link>
				</div>
			</div>

			<button
				role='button'
				className={menuClass}
				aria-label='menu'
				aria-expanded='false'
				onClick={toggleMenu}
				data-target='navbarBasicExample'>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
			</button>

			<div id='navbarBasicExample' className='navbar-menu'>
				<div className='navbar-end'>
					<div className='navbar-item'>
						<div className='buttons'>
							<Link to='/signup' className='button is-primary'>
								<strong>Sign up</strong>
							</Link>
							<Link to='/login' className='button is-light'>
								Log in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);

	const loggedIn = (
		<nav className='navbar' role='navigation' aria-label='main navigation'>
			<div className='navbar-brand'>
				<Link className='navbar-item' to='/'>
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605818361/red-ink/logo2_transparent.png'
						alt='red-ink-logo'
					/>
				</Link>
			</div>

			<button
				role='button'
				className={menuClass}
				aria-label='menu'
				aria-expanded='false'
				onClick={toggleMenu}
				data-target='navbarBasicExample'>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
			</button>

			<div
				id='navbarBasicExample'
				className={`navbar-menu ${activeMenu ? 'is-active' : ''}`}>
				<div className='navbar-start'>
					<Link to='/' className='navbar-item'>
						Home
					</Link>
					<Link to='/about' className='navbar-item'>
						About
					</Link>
					<Link to='/account' className='navbar-item'>
						My Account
					</Link>
					<Link to='/editors' className='navbar-item'>
						Editors
					</Link>
					<Link to='/logout' onClick={logOut} className='navbar-item'>
						Log Out
					</Link>
				</div>
			</div>
		</nav>
	);

	return uid ? loggedIn : loggedOut;
};

export default Header;
