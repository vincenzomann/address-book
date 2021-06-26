import React, { useReducer, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Select from 'react-select';
import { countries } from '../helpers/countries';
import { useContextProvider } from './../context/Context';
import { Address, Response } from '../types';

const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value
	};
};

interface Props extends RouteComponentProps { }

const Lookup: React.FC<Props> = () => {

	const [mode, setMode] = useState<'search' | 'manual'>('search');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [results, setResults] = useState<Response>();

	const { addresses, setAddresses } = useContextProvider();

	const [formData, setFormData] = useReducer(formReducer, {
		postcode: '',
		houseNumber: '',
		address1: '',
		address2: '',
		address3: '',
		town: '',
		country: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError('');
		setMessage('');
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

		if (!formData.postcode) {
			// Return if no postcode set
			return setError('Field input required');
		} else {
			// If postcode doesn't match the regex format, search() returns -1
			if (formData.postcode.search(postCodeRegex) === -1) {
				return setError('Invalid Postcode');
			};
		}

		if (mode === 'search') {
			fetch(`https://api.getAddress.io/find/${formData.postcode}${formData.houseNumber && `/${formData.houseNumber}`}?api-key=${process.env.REACT_APP_API_KE}&expand=true`, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				},
			}).then((res) => {
				return res.json();
			}).then((data: Response) => {
				setResults(data);
			}).catch((error) => {
				setError('Invalid call, please insert your getAddress() API key in the .env file. Eg. REACT_APP_API_KEY=your-api-key');
			});
		} else {
			// Check required inputs
			if (!formData.postcode || !formData.address1 || !formData.town || !formData.country) {
				return setError('Field input required');
			}

			// Add address to context state
			const address: Address = {
				id: formData.address1 + formData.postcode,
				postcode: formData.postcode,
				line1: formData.address1,
				line2: formData.address2,
				line3: formData.address3,
				town: formData.town,
				country: formData.country,
			};
			// Check if address already exists
			console.log(addresses.findIndex((stateAddress) => {
				return stateAddress.id === address.id;
			}));
			if (addresses.findIndex((stateAddress) => {
				return stateAddress.id === address.id;
			}) !== -1) {
				return setError('Address already added');
			} else {
				setAddresses((prevState) => {
					return [...prevState, address];
				});
				setMessage('Address added');
				// Reset form
				setFormData({
					postcode: '',
					houseNumber: '',
					address1: '',
					address2: '',
					address3: '',
					town: '',
					country: '',
				});
			}
		}
	};

	const handleAdd = (address: Address) => {
		// Check if the address is already in the address book
		if (addresses.findIndex((stateAddress) => {
			return stateAddress.id === address.id;
		}) !== -1) {
			return setError('Address already added');
		}
		setAddresses((prevState) => {
			return [...prevState, address];
		});
	};

	const customStyles = {
		control: (styles: any) => ({
			...styles, borderRadius: '10px', height: '2.5rem', padding: '0 0.5rem',
			border: (error && !formData.country) && '1px solid #f36f5e'
		}),
		valueContainer: (styles: any) => ({ ...styles, height: '100%', padding: '0 0.5rem' }),
	};

	const setErrorBorder = (formProperty: string) => {
		if (error && !formProperty) {
			return {
				border: '1px solid #f36f5e'
			};
		}
	};

	return (
		<div id='addAddress'>
			<h1 className='pageTitle'>
				Add Address
			</h1>

			<div id='formContainer'>
				<div className='card'>
					<div id='switch'>
						<span className={`option ${mode === 'search' && 'selected'}`}
							onClick={() => setMode('search')}>SEARCH</span>
						<span className={`option ${mode === 'manual' && 'selected'}`}
							onClick={() => setMode('manual')}>MANUAL</span>
					</div>
					<form id='form' onSubmit={(e) => handleSubmit(e)}>
						{mode === 'search' ? (
							<div id='postcode' className='inputs'>
								<div>
									<input type='text' placeholder='*postcode'
										name='postcode' value={formData.postcode}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.postcode)} />
								</div>
								<div>
									<input type='text' placeholder='house number'
										name='houseNumber' value={formData.houseNumber}
										onChange={(e) => handleChange(e)} />
								</div>
							</div>
						) : (
							<div id='manual' className='inputs'>
								<div>
									<input type='text' placeholder='*address line 1'
										name='address1' value={formData.address1}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.address1)} />
								</div>
								<div>
									<input type='text' placeholder='address line 2'
										name='address2' value={formData.address2}
										onChange={(e) => handleChange(e)} />
								</div>
								<div>
									<input type='text' placeholder='address line 3'
										name='address3' value={formData.address3}
										onChange={(e) => handleChange(e)} />
								</div>
								<div>
									<input type='text' placeholder='*postcode'
										name='postcode' value={formData.postcode}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.postcode)} />
								</div>
								<div>
									<input type='text' placeholder='*town'
										name='town' value={formData.town}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.town)} />
								</div>
								<div>
									<Select id='select' placeholder='*country'
										styles={customStyles} isClearable
										options={countries.map((country) => {
											return { value: country, label: country };
										})} onChange={(e) => {
											setError('');
											setFormData({
												name: 'country',
												value: e?.value,
											});
										}} />
								</div>
							</div>
						)}
						{error && <div className='error'>{error}</div>}
						{message && mode === 'manual' && <div className='message'>{message}</div>}
						<input type='submit' value={mode === 'search' ? 'Search' : 'Add'} id='searchBtn' />
					</form>
				</div>
			</div>

			{/* Only display results on search mode */}
			<div id='results' style={{ display: mode === 'search' ? '' : 'none' }}>
				{results && <h2>Results</h2>}
				{results?.addresses.map((data) => {
					const address: Address = {
						id: data.line_1 + results.postcode,
						postcode: results.postcode,
						line1: data.line_1,
						line2: data.line_2,
						line3: data.line_3,
						town: data.town_or_city,
						country: data.country,
					};
					return (
						// If the card id exists in the state, show it has been added className style
						<div
							className={`card result 
								${(addresses.findIndex((stateAddress) => {
								return stateAddress.id === address.id;
							}) !== -1) && 'added'}
							`}
							key={address.id}
							onClick={() => handleAdd(address)}
						>
							{address.line1 && <p>{address.line1}</p>}
							{address.line2 && <p>{address.line2}</p>}
							{address.line3 && <p>{address.line3}</p>}
							{address.postcode && <p>{address.postcode}</p>}
							{address.town && <p>{address.town}</p>}
							{address.country && <p>{address.country}</p>}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Lookup;
