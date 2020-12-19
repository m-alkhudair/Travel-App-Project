// To connect to an API that provides all the country code, to use them in the Geoname API
const getCountryCode = async ()=> {
	const response = await fetch('https://restcountries.eu/rest/v2/all');
	try {
		const jsonResponse = await response.json();
        let countries = {};
        let countryArray = [];
        // To populate the selector field with all the countries
        const countryList = document.querySelector('select');

        jsonResponse.forEach(element => {
            countries[element.name] = element.alpha2Code
            countryArray.push(element.name);
        });

        countryArray.forEach(country => {
        const countryOption = document.createElement('option');
        countryOption.setAttribute('value', countries[country])
        countryOption.innerHTML = country;
        countryList.append(countryOption);
        })
        
	} catch(error) {
		console.log('error', error);
	}
}

getCountryCode();

export {getCountryCode}