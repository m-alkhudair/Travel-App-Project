const newCardsDiv = document.getElementById('new-cards');
const hideEntriesBttn = document.getElementById('hide-entries');

// To get project data from the server to display cards for previous entries
const makeNewCard = async (event) => {
    event.preventDefault();

    document.getElementById('bttn-mssg').innerHTML = '';
    newCardsDiv.innerHTML = '';
    hideEntriesBttn.setAttribute('style', 'display: unset;');
        
    const response = await fetch(`http://localhost:4444/dataArray`, {
    method: 'GET',
    credentials: 'same-origin'
    });

    try {
        const jsonResponse = await response.json();

        if (jsonResponse.length === 0){
            document.getElementById('bttn-mssg').innerHTML = '<b id="no-saved-data" style="color: #823e48;">No Data Have Been Saved Yet!</b>';
            hideEntriesBttn.setAttribute('style', 'display: none;')
        } else {
            document.getElementById('previous-entries').innerHTML = 'REFRESH Saved Entries';
            document.getElementById('previous-entries').setAttribute('style', 'background-color:  #823e48')

            jsonResponse.forEach((item, index)=>{
                const card = document.getElementById('fig-container');
                const newCard = card.cloneNode(true);
                const figcaption = newCard.children[0].children[1];
     
                const forecastedTempFromServer = ()=> {
                    return jsonResponse[index].forcastedDays[Client.countDown(jsonResponse[index].dateOfArrival)-1];
                };
                
                figcaption.parentElement.children[0].setAttribute('src', jsonResponse[index].imageData===undefined? 'https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727__480.jpg': jsonResponse[index].imageData.imageSrc)
                figcaption.parentElement.children[0].setAttribute('alt', jsonResponse[index].imageData===undefined? 'airport, flight info': jsonResponse[index].imageData.imageAlt)  
        
                figcaption.children[1].children[0].innerHTML = `<b>Place name:</b> ${jsonResponse[index].cityName}, ${jsonResponse[index].countryName} - ${Client.countDown(jsonResponse[index].dateOfArrival)? 'Trip in ' +Client.countDown(jsonResponse[index].dateOfArrival)+ ' days!' : ''}`;
                figcaption.children[1].children[1].innerHTML = `<b>Date of Arrival</b>: ${jsonResponse[index].dateOfArrival}`;

                if (forecastedTempFromServer()===undefined) {
                    figcaption.children[1].children[3].innerHTML = `<b>Temperature High:</b> ${jsonResponse[index].forcastedDays[0].highTemp}&#8457 - <b>Temperatur Low:</b> ${jsonResponse[index].forcastedDays[0].lowTemp}&#8457`;
                    figcaption.children[1].children[4].innerHTML = `<b>Forecast:</b> ${jsonResponse[index].forcastedDays[0].weatherDes}.`;
                    figcaption.children[1].children[2].innerHTML = `This app can only provide future weaher data for upto 16 days from today! This is the weather today!`;    
                } else {
                    figcaption.children[1].children[2].innerHTML = `Weather on the date of arrival is expected to be:`;
                    figcaption.children[1].children[3].innerHTML = `<b>Temperature High:</b> ${forecastedTempFromServer().highTemp}&#8457 - <b>Temperatur Low:</b> ${forecastedTempFromServer().lowTemp}&#8457`;
                    figcaption.children[1].children[4].innerHTML = `<b>Forecast:</b> ${forecastedTempFromServer().weatherDes}.`;
                }
                newCardsDiv.insertAdjacentElement('beforeend', newCard);
            })    
        }
        newCardsDiv.scrollIntoView({behavior: "smooth"});    
    } catch (error) {
        console.log('error', error);
    }
}

const hideNewCards = (event)=> {
    event.preventDefault();

    newCardsDiv.innerHTML = '';
    hideEntriesBttn.setAttribute('style', 'display: none;');
    document.getElementById('previous-entries').innerHTML = 'Show Saved Entries';
    document.getElementById('previous-entries').setAttribute('style', 'background-color: #3b4a6b');
}

export {makeNewCard}
export {hideNewCards}

