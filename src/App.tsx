import React, { useEffect } from 'react';
import './App.scss';
import { navigate, Router } from '@reach/router';
import AddressBook from './components/AddressBook';
import Lookup from './components/Lookup';
import ContextProvider from './context/Context';
import SideNav from './components/SideNav';

function App() {

	useEffect(() => {
		if (window.location.pathname === '/') {
			navigate('/address-book');
		}
	}, []);

	return (
		<div id="app">
			<ContextProvider >
				<SideNav />
				<div id="content">
					<Router>
						<AddressBook path='/address-book' default />
						<Lookup path='/lookup' />
					</Router>
				</div>
			</ContextProvider>
		</div>
	);
}

export default App;
