import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps { }

const Lookup: React.FC<Props> = () => {

	const [mode, setMode] = useState<'postcode' | 'manual'>('postcode');
	const [error, setError] = useState('');

	return (
		<div id='lookup'>
			<h1 className='pageTitle'>
				Lookup Address
			</h1>

			<div id="lookupContainer">
				<div className="card">
					<div id='switch'>
						<span className={`option ${mode === 'postcode' && 'selected'}`}
							onClick={() => setMode('postcode')}>POSTCODE</span>
						<span className={`option ${mode === 'manual' && 'selected'}`}
							onClick={() => setMode('manual')}>MANUALLY</span>
					</div>
					<form id='form' action="">
						{mode === 'postcode' ? (
							<div id='postcode' className='inputs'>
								<input type='text' placeholder='postcode' />
							</div>
						) : (
							<div id='manual' className='inputs'>
								<div><input type="text" placeholder='address line 1' /></div>
								<div><input type="text" placeholder='address line 2' /></div>
								<div><input type="text" placeholder='address line 3' /></div>
								<div><input type="text" placeholder='postcode' /></div>
								<div><input type="text" placeholder='town' /></div>
								<div><input type="text" placeholder='country' /></div>
							</div>
						)}
						{error && <div className="error">{error}</div>}
						<button id="searchBtn">
							Search
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Lookup;
