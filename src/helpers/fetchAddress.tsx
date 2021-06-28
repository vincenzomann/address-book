
const fetchAddress = (formData: { postcode: string; houseNumber: string; }) => {
	return fetch(`https://api.getAddress.io/find/${formData.postcode}${formData.houseNumber && `/${formData.houseNumber}`}?api-key=${process.env.REACT_APP_API_KEY}&expand=true`, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
	}).then((res) => {
		return res.json();
	});
};

export default fetchAddress;
