import {handleSubmit} from './js/updateUI';
import {today} from './js/countDown';
import {getCountryCode} from './js/getCountry';
import {countDown} from './js/countDown';
import {getCred} from './js/getCred';
import {getWeatherBit} from './js/getWeatherBit';
import {getGeoCoordinates} from './js/getGeoname';
import {getPixabay} from './js/getPixabay';
import {makeNewCard} from './js/previousEntries';
import {hideNewCards} from './js/previousEntries';

import './styles/mobile.scss';
import './styles/style.scss';

//Event listeners:
document.getElementById('generate').addEventListener('click', handleSubmit);
document.getElementById('previous-entries').addEventListener('click', makeNewCard);
document.getElementById('hide-entries').addEventListener('click', hideNewCards);

export {
    handleSubmit,
    getCountryCode,
    countDown,
    today,
    getCred,
    getWeatherBit,
    getGeoCoordinates,
    getPixabay,
    makeNewCard,
    hideNewCards
}
