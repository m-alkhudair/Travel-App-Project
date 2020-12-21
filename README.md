# About this App
This app was built to meet the graduation requirements for the Frontend Web Development nanodegree from Udacity.

This is a Travel Planner that allows the user to save information about the desired destination. This information includes the date of arrival, and the number of days until the travel date and the weather on that date. You can access the previous entries by clicking on the Show Saved Entries button.

# To Start the App
In the terminal, enter these commands: 
- npm install
- npm run prod
- npm start

# Geoname API
This app access the Geomane API to retrieve the longitude and latitude of the inputted city using the getGeoCoocrdinates() function. The object returned by this function includes city data as well as the weather forecast from the WeatherBit API and image data from the Pixabay API. The returned data will be posted to the server and store in an array of objects.

# WeatherBit API
The app accessed the WeatherBit API through the getWeatherbit() function. The function receives longitude and latitude information from the Geoname API inside the getGeoCoordinates() function. The data the getWeatherbit() function returns is an object of a 16-day weather forecast, including things like temperature lows and highs and weather descriptions.

# Pixabay API
The app access the Pixabay API through the getPixabay() function. This function returns an object of image data includes the image 'src' and 'alt'. This function is also called inside of the getGeoCoordinates function in the returned object.

# Count Down
The app provides the feature of a countdown. This countDown() function will calculate the days left before the date of travel.

# Previous Entries
Previous entries are available to the user after clicking the Show Saved Entries button. These saved entries are created by retrieving the data posted on the local server through a get request. This data is then used to create HTML elements.

# Updating the UI
All the data used to update the UI are retrieved from the local server. The handleSubmit() function will connect all the moving parts together. It is an event handler function that will call the getGeoCoordinates() function and use .then() channel the data to the postData() function. The latter will post everything to the local server. The request data will then be used to call the updateUI() function to make the change appear on the browser.
