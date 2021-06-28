### Task description

Technical TasK
Please create a React (+ Typescript) app with a page that allows users to select an address from an address book. If the address book is empty, the user should be able to lookup address by postcode or enter address manually. The user should be able to switch between 2 modes (postcode lookup or manual entry). Once address is selected or manually entered, it should be saved to the address book. When searching for address by postcode, the user should be presented with results and be able to select an address. The address should include line1-3, postcode, town and country.

When entering address manually, line1, postcode, town and country are mandatory. Country should be a combobox with autosuggestion. The user can either pick from the list, or fully type the country name.

When searching by postcode, use https://getaddress.io/ API (sign up with an email to get free trial). You should handle different error cases, e.g. wrong postcode. The style should match Bequest's branding which you can find on the website. Pleas just try to match it as closely as possible!

### Installation

For the app to work you must insert your own getAddress() API key into the .env file as it is a required parameter for the api. Create .env file in the root directory and include `REACT_APP_API_KEY=your_api_key`

(contact me if you need to use my key, I have not included on github as best practice)

If you start the server before updating the .env file, you will need to restart the server after the file is saved.

### Scripts

`npm i`

`npm start`

`npm test`

### Endpoints

| url           | Page         | Description                                                     |
| ------------- | ------------ | --------------------------------------------------------------- |
| /address-book | Address Book | Displays the address saved into the address book                |
| /add-address  | Add Address  | Form to search for address by postcode, or add address manually |
