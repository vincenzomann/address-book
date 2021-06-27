import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import './sass/AddAddress.scss';
import Results from './Results';
import AddressForm from './AddressForm';
import { useContextProvider } from '../context/Context';

interface Props extends RouteComponentProps { }

const Lookup: React.FC<Props> = () => {

	const { results, setResults } = useContextProvider();

	const [mode, setMode] = useState<'search' | 'manual'>('search');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	return (
		<div id='addAddress'>
			<h1 className='pageTitle'>
				Add Address
			</h1>

			<div id='formContainer'>
				<AddressForm
					setResults={setResults}
					error={error} setError={setError}
					message={message} setMessage={setMessage}
					mode={mode} setMode={setMode}
				/>
			</div>

			{/* Only display results on search mode */}
			<div id='results' style={{ display: mode === 'search' ? '' : 'none' }}>
				{results && <Results results={results} setError={setError} setMessage={setMessage} />}
			</div>
		</div>
	);
};

export default Lookup;
