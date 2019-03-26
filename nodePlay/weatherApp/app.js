const weather = require('./weather.js');

const input = process.argv.slice(2);
const place = input[0];
const key = input[1];

const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${key}`;
weather.get(requestURL);