
//connect to treehouse API to get profile information

//import https module
const https = require('https');
const username = 'martatrusohamn';

function userToConsole(username, badgeCount, point) {
    const message = `${username} has ${badgeCount} total badges and ${point} points in JS`;
    console.log(message);
}

//connecto to API URL (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`,
response => {
    console.dir(response.statusCode);
    //gather all packages of text
    let body = "";
    //read data
    response.on('data', data => {
        //console.log('buffer: ' + data);
        //console.log('string: ' + data.toString());
        body += data.toString();

    })
    //finish on end event
    response.on('end', () => {
        console.log(body);
    })
    //parse json

});


