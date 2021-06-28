import React, { useEffect } from 'react';
import './App.scss';
import { navigate, Router } from '@reach/router';
import AddressBook from './components/AddressBook';
import AddAddress from './components/AddAddress';
import ContextProvider from './context/Context';
import SideNav from './components/SideNav';

function App() {

	useEffect(() => {
		// Redirect user to AddressBook as the root endpoint
		if (window.location.pathname === '/') {
			navigate('/address-book');
		}
	}, []);

	return (
		<div id='app' data-testid='app'>
			<ContextProvider >
				<SideNav />
				<div id='content'>
					<Router>
						<AddressBook path='/address-book' default />
						<AddAddress path='/add-address' />
					</Router>
				</div>
			</ContextProvider>
		</div>
	);
}

export default App;
