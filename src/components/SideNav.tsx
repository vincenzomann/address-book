import { navigate } from '@reach/router';
import React from 'react';
import { FaAddressBook, FaMapMarkedAlt } from 'react-icons/fa';

interface Props { }

const SideNav: React.FC<Props> = () => {
	return (
		<div id='sideNav'>
			<div id='logoItem'>
				<img className='logo' id='logo-mob' src="https://bequest.app/static/media/icon.3ab9eb70.png" alt="Bequest" />
				<img className='logo' id='logo-full' src="https://bequest.app/static/media/logo.e211df9f.png" alt="Bequest" />
			</div>
			<div id='navItems'>
				<div className='navItem' onClick={() => navigate('/address-book')}>
					<span className='icon'><FaAddressBook size='25' /></span>
					<span className='linkText'>Address Book</span>
				</div>
				<div className='navItem' onClick={() => navigate('/lookup')}>
					<span className='icon'><FaMapMarkedAlt size='25' /></span>
					<span className='linkText'>Lookup Address</span>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
