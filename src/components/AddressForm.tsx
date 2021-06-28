import React, { useReducer } from 'react';
import { useContextProvider } from '../context/Context';
import { countries } from '../helpers/countries';
import { Address } from '../types';
import Select from 'react-select';
import fetchAddress from '../helpers/fetchAddress';

const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value
	};
};

export interface Props {
	setResults: React.Dispatch<React.SetStateAction<Response | any>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	mode: 'search' | 'manual';
	setMode: React.Dispatch<React.SetStateAction<'search' | 'manual'>>;
}

const AddressForm: React.FC<Props> = ({
	setResults, error, setError, message, setMessage, mode, setMode }) => {

	// Get state from context
	const { addresses, setAddresses } = useContextProvider();

	// Reducer holds all the values from both forms
	const [formData, setFormData] = useReducer(formReducer, {
		postcode: '',
		houseNumber: '',
		address1: '',
		address2: '',
		address3: '',
		town: '',
		country: '',
	});

	// When a form input is updated the value is added to the form by its name
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

		// Regex to check the postcode has correct format
		let postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

		if (!formData.postcode) {
			// Return if no postcode set
			return setError('Field input required');
		} else {
			// If postcode doesn't match the regex format, search() returns -1
			if (formData.postcode.search(postcodeRegex) === -1) {
				return setError('Invalid Postcode');
			};
		}

		// Perform logic for 'search' form, else 'manual' form
		if (mode === 'search') {
			fetchAddress(formData).then((data: Response) => {
				// Set the response data in the context state
				setResults(data);
				setError('');
				setMessage('');
			}).catch((error) => {
				console.log(error);
				setError('Invalid call, please insert your getAddress() API key in the .env file and restart the server. Eg. REACT_APP_API_KEY=your-api-key');
			});
		} else {
			// Logic for 'manual' form

			// Check required inputs
			if (!formData.postcode || !formData.address1 || !formData.town || !formData.country) {
				return setError('Field input required');
			}

			// Add address to context state
			const address: Address = {
				id: formData.postcode + formData.address1 + formData.address2 + formData.address3,
				postcode: formData.postcode,
				line1: formData.address1,
				line2: formData.address2,
				line3: formData.address3,
				town: formData.town,
				country: formData.country,
			};
			// Check if address already exists
			if (addresses.findIndex((stateAddress) => {
				return stateAddress.id === address.id;
			}) !== -1) {
				return setError('Address already added');
			} else {
				// Append the address to the context state of addresses
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

	// Customise react-select dropdown form
	const customStyles = {
		control: (styles: any) => ({
			...styles, borderRadius: '10px', height: '2.5rem', padding: '0 0.5rem',
			border: (error && !formData.country) && '1px solid #f36f5e'
		}),
		valueContainer: (styles: any) => ({ ...styles, height: '100%', padding: '0 0.5rem' }),
	};

	// When a required field is empty on form submit, change the field border red
	const setErrorBorder = (formProperty: string) => {
		if (error === 'Field input required' && !formProperty) {
			return {
				border: '1px solid #f36f5e'
			};
		}
	};

	return (
		<div className='card' data-testid='addressForm'>
			<div id='switch'>
				{/* Switch between 'search' and 'manual' forms */}
				<span className={`option ${mode === 'search' && 'selected'}`}
					onClick={() => setMode('search')}>SEARCH</span>
				<span className={`option ${mode === 'manual' && 'selected'}`}
					onClick={() => setMode('manual')}>MANUAL</span>
			</div>
			<form id='form' onSubmit={(e) => handleSubmit(e)} data-testid='form'>
				{/* Show different fields depending on the form mode */}
				{mode === 'search' ? (
					<div id='postcode' className='inputs'>
						<div>
							<input type='text' placeholder='*postcode' data-testid='postcode'
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
							{/* Module that provides dropdown select, options are from countries.tsx */}
							<Select id='select' placeholder='*country' name='country'
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
	);
};

export default AddressForm;
