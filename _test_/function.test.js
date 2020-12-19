import {getCountryCode} from '../src/client/js/getCountry';
import {getGeoCoordinates} from '../src/client/js/getGeoname';
import {getPixabay} from '../src/client/js/getPixabay';
import {getWeatherBit} from '../src/client/js/getWeatherBit';
import {makeNewCard} from '../src/client/js/previousEntries';
import {handleSubmit} from '../src/client/js/updateUI';

test('This fucntion will not return data but will populate the html <select> element', ()=>{
    expect(getCountryCode()).toBeDefined()
})

test('Retrieves location data in the form of an object from Geoname API', ()=>{
    expect(typeof getGeoCoordinates('Paris')).toEqual('object')
})

test('Retrieves image data from Pixabay API in the form of an object', ()=>{
    expect(typeof getPixabay('Paris')).toEqual('object')
})

test('Retrieves weather data from WeatherBit API in the form of an object', ()=>{
    expect(typeof getWeatherBit('48.8566', '2.3522')).toEqual('object')   
})

test('This function will not return data but will create html compoments', ()=>{
    expect(makeNewCard()).toBeDefined()
})

test('This function will run after the click event to update the UI with data from the local server', ()=>{
    expect(typeof handleSubmit).toEqual('function')
})