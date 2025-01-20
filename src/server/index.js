var path = require('path');
const express = require('express');
//create dotnev
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');
const { getCityLocation } = require('./getCityLocation');
const { getWeather } = require('./getWeather');
const { getPicture } = require('./getPicture');
app.use(cors());


console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));


// Variables for url and api key
// API key for geonames
const userName = process.env.USERNAME_KEY;
// API key for Weather
const weatherKey = process.env.WEATHER_KEY;
// API key for Pixabay
const pixabayKey = process.env.PICTURE_KEY;


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// POST Route for geonames API
app.post('/getCity', async (req, res) => {
    const {city} = req.body;
    const location = await getCityLocation(city, userName);
    res.send(location);
   
});

//POST Route for Weather API
app.post('/getWeather', async (req, res) => {
    const {lat, lng, remainingDays} = req.body;
    const weather = await getWeather(lat, lng, remainingDays, weatherKey);
    res.send(weather);
});

//POST ROUTE for Pixabay API
app.post('/getCityPicture', async (req, res) =>{
    const {city} = req.body;
    const picture = await getPicture(city, pixabayKey)
    res.send(picture);
})

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});