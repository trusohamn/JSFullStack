
const https = require('https');
const http = require('http');

function printError(error) {
    console.error(error.message);
}

function getWeather(requestURL){
    try {
        const request = https.get(requestURL,
            response => {
                    //console.dir(response.statusCode);
                    if(response.statusCode == 200){
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
                            //console.log(body);
                            try {
                                weather = JSON.parse(body);
                                console.dir(weather);
                            } catch (error) {
                                console.error("Parsing error: " + error.message);
                            }
                            //TODO: pretty printing
                    })
                } else {
                    const errorMessage = `Error ${http.STATUS_CODES[response.statusCode]} for ${username}`;
                    const statusCodeError = new Error(errorMessage);
                    printError(statusCodeError);
                }

            });
            request.on('error', error => {
                printError(error);
            });
    } catch (error) {
        printError(error);
    }
}

module.exports.get = getWeather;