import React, { useReducer, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Select from 'react-select';
import { countries } from '../helpers/countries';

const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value
	};
};

interface Props extends RouteComponentProps { }

const Lookup: React.FC<Props> = () => {

	const [mode, setMode] = useState<'postcode' | 'manual'>('postcode');
	const [error, setError] = useState('');

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
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);

		let postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

		if (!formData.postcode) {
			// Return if no postcode set
			return setError('Input required');
		} else {
			// If postcode doesn't match the regex format, search() returns -1
			if (formData.postcode.search(postCodeRegex) === -1) return;
		}

		if (mode === 'postcode') {

		} else {
			// Check required inputs
			if (!formData.postcode || !formData.address1 || !formData.town || !formData.country) {
				return setError('Input required');
			}
		}
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
					<form id='form' onSubmit={(e) => handleSubmit(e)}>
						{mode === 'postcode' ? (
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
									<input type="text" placeholder='*address line 1'
										name='address1' value={formData.address1}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.address1)} />
								</div>
								<div>
									<input type="text" placeholder='address line 2'
										name='address2' value={formData.address2}
										onChange={(e) => handleChange(e)} />
								</div>
								<div>
									<input type="text" placeholder='address line 3'
										name='address3' value={formData.address3}
										onChange={(e) => handleChange(e)} />
								</div>
								<div>
									<input type="text" placeholder='*postcode'
										name='postcode' value={formData.postcode}
										onChange={(e) => handleChange(e)}
										style={setErrorBorder(formData.postcode)} />
								</div>
								<div>
									<input type="text" placeholder='*town'
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
						{error && <div className="error">{error}</div>}
						<input type='submit' value='Search' id="searchBtn" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Lookup;
