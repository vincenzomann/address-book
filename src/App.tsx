import React from 'react';
import './App.scss';
import { Router } from '@reach/router';
import AddressBook from './components/AddressBook';
import Lookup from './components/Lookup';
import ContextProvider from './context/Context';
import SideNav from './components/SideNav';

function App() {
	return (
		<div id="app">
			<ContextProvider >
				<SideNav />
				<Router>
					<AddressBook path='/address-book' default />
					<Lookup path='/lookup' />
				</Router>
			</ContextProvider>
		</div>
	);
}

export default App;
