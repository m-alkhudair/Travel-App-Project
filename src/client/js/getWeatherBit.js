const getWeatherBit = async (lat, lon)=> {
    const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?key=${await Client.getCred('weatherBit')}&units=I&&lat=${lat}&lon=${lon}`);

    try {
        const jsonResponse = await response.json();
        let forcastedDays = [];

        jsonResponse.data.forEach((item, index)=>{
            index = { 
            highTemp: item.high_temp,
            lowTemp: item.low_temp,
            weatherDes: item.weather.description
            }
            forcastedDays.push(index);
        })

        return forcastedDays;    
    } catch(error) {
        console.log('error', error);
    }
}


export {getWeatherBit}