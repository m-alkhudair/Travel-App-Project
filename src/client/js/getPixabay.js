const getPixabay = async (imageSearch)=> {
    const url = 'https://pixabay.com/api/';
    const endpoint = `${url}?key=${await Client.getCred('pixabay')}&q=${imageSearch}&category=places`;   
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    try {
        const imageData = {
            imageSrc: jsonResponse.hits[0].largeImageURL,
            imageAlt: jsonResponse.hits[0].tags
        };

        return imageData;
    } catch(error) {
        console.log('error', error);
    }
}

export {getPixabay}