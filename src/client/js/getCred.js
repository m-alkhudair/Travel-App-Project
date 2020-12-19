// To get API credentials from the .env file through the server
const getCred = async (api)=>{
    const response = await fetch('http://localhost:4444/cred');
    try {
        const jsonResponse = await response.json();

        if (api==='weatherBit'){
            return jsonResponse.weatherBitKey;
        } else if (api==='geo') {
            return jsonResponse.GeonNameUsername;
        } else if (api==='pixabay') {
            return jsonResponse.pixabayKey;
        } 
    } catch(error) {
        console.log('error', error);
    }
}

export {getCred}