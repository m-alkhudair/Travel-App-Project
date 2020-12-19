let projectDataArray = [];

// To be able to access the data in .env file
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())


// Initialize the main project folder
app.use(express.static('dist'));


app.get('/data', (request, response)=>{ 
    response.send(projectData);
});

//To store the data posted to the server form the client side function
const addData = (request, response)=>{
    const data = request.body;

    projectData = {};

    projectData['latitude'] = data.latitude;
    projectData['logitude'] = data.logitude;
    projectData['cityName'] = data.cityName;
    projectData['countryName'] = data.countryName;
    projectData['countryCode'] = data.country;
    projectData['forcastedDays'] = data.forcastedDays;
    projectData['imageData'] = data.imageData;
    projectData['dateOfArrival'] = data.dateOfArrival;

    console.log(projectData);
    projectDataArray.push(projectData)
    console.log(projectDataArray);

    response.send(projectDataArray);
}
app.post('/data', addData); 
app.get('/dataArray', (req, res)=>{
    res.send(projectDataArray)
})

const cred = {
    weatherBitKey: process.env.WEATHER_BIT_API_KEY,  
    GeonNameUsername: process.env.GEO_NAME_USERNAME,
    pixabayKey: process.env.PIXABAY_API_KEY    
};

app.get('/cred', (req, res)=>{
    res.send(cred);
})

module.exports = app;
