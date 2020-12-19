//To get data from Geoname
const getGeoCoordinates = async (city)=>{ 
    const option = document.getElementById('country-list');
    const tripDate = document.getElementById('trip-date');
    const countryCode = option.value;
    const url = `http://api.geonames.org/searchJSON?username=${await Client.getCred('geo')}&`;
    const endpoint = `${url}placename=${city}&country=${countryCode}&maxRows=1000`;
    
	const response = await fetch(endpoint, {
		'method': 'GET'		
	})

	try {
        const jsonResponse = await response.json();

        console.log('this is from geoname', jsonResponse);
        
        //The returned data is destined to the server
        for (let i=0; i<jsonResponse.geonames.length; i++) {
            if ((jsonResponse.geonames[i].name).includes(city)) {       
                //The data from the WeatherBit API and Pixabay API i accessed bellow and sent to the local server
		        return { 
                    forcastedDays: await Client.getWeatherBit(jsonResponse.geonames[i].lat, jsonResponse.geonames[i].lng),
                    latitude: jsonResponse.geonames[i].lat, 
                    logitude: jsonResponse.geonames[i].lng, 
                    cityName: jsonResponse.geonames[i].name,
                    countryName: jsonResponse.geonames[i].countryName, 
                    country: countryCode,
                    imageData: await Client.getPixabay(city),
                    dateOfArrival: tripDate.value? tripDate.value: Client.today(),
                };
                
                break;
            }  
        }
	} catch(error) {
		console.log('error', error);
	}
}

export {getGeoCoordinates}