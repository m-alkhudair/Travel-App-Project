//To update the UI with the data from the local server
const updateUI = async ()=>{
	const date = document.getElementById('date');
	const temp = document.getElementById('temp');
	const forecast = document.getElementById('forecast');
	const name = document.getElementById('name');
	const message = document.getElementById('mssg');
	const cityImageTag = document.getElementById('city-image');

	document.getElementById('bttn-mssg').innerHTML = '';

	const response = await fetch(`http://localhost:4444/data`, {
		method: 'GET',
		credentials: 'same-origin'
	});

	try {
		const jsonResponse = await response.json();
		//To get the forecast for exact day inputted
		const forecastedTempFromServer = ()=> {
			return jsonResponse.forcastedDays[Client.countDown()-1];
		};
		
		cityImageTag.setAttribute('src', jsonResponse.imageData===undefined? 'https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727__480.jpg' :jsonResponse.imageData.imageSrc);
		cityImageTag.setAttribute('alt', jsonResponse.imageData===undefined? 'airport, flight info' : jsonResponse.imageData.imageAlt);

		name.innerHTML = `<b>Place name:</b> ${jsonResponse.cityName}, ${jsonResponse.countryName} - ${Client.countDown()? 'Trip in ' +Client.countDown()+ ' day(s)!' : ''}`;
		date.innerHTML = `<b>Date of Arrival</b>: ${jsonResponse.dateOfArrival}`;

		if (forecastedTempFromServer()===undefined) {
			temp.innerHTML = `<b>Temperature High:</b> ${jsonResponse.forcastedDays[0].highTemp}&#8457 - <b>Temperatur Low:</b> ${jsonResponse.forcastedDays[0].lowTemp}&#8457`;
			forecast.innerHTML = `<b>Forecast:</b> ${jsonResponse.forcastedDays[0].weatherDes}.`;
			message.innerHTML = `Please choose a date with within 16 days. This app can only provide future weaher data for upto 16 days from today! This is the weather today!`;
		} else {
			temp.innerHTML = `<b>Temperature High:</b> ${forecastedTempFromServer().highTemp}&#8457 - <b>Temperatur Low:</b> ${forecastedTempFromServer().lowTemp}&#8457`;
			forecast.innerHTML = `<b>Forecast:</b> ${forecastedTempFromServer().weatherDes}.`;
			message.innerHTML = `Weather on the date of arrival is expected to be:`;
		}
	} catch(error) {
		console.log('error', error);
	} 
}

//To post the data retrieved to the local server
const postData =  async (url, data) => {
	if (data===undefined) {
		return false
	} 

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
	});
	
    try {
		return data;
    } catch(error) {
        console.log('error', error);
    }
}

const handleSubmit = async (event)=> {
	event.preventDefault()

	const loader = document.getElementById('loader')
	const city = document.getElementById('city');
	const cityInput = city.value;

	loader.setAttribute('class', 'loader');

	if (cityInput==='') {
		alert('City Field Empty!');
		return false;
	};

	const returnCity = (input)=> {
		if (input.split(' ').length>1) {
			let capitalizedInput = []
			input.split(' ').forEach(item => {
				capitalizedInput.push(item.charAt(0).toUpperCase() + item.slice(1));
			});

			return capitalizedInput.join(' ');
		} else {
			return cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
		}
	}

	Client.getGeoCoordinates(returnCity(cityInput))
	.then((data)=>{
		postData(`http://localhost:4444/data`, data)
		.then((data)=>{
			if (data){
				updateUI();
				loader.removeAttribute('class');
			} else {
				alert('Invalid Entry, Remember to Select the Correct Country or, Check the Spelling!');
			}			
		})
	})
}

export {handleSubmit}
