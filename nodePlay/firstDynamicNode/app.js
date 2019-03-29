var http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

//create web server
http.createServer(function (request, response) {  
    if (request.url === '/style.css') {
        //loading the css, call the url /stye.css
        console.log('loading css')

        response.writeHead(200, {'Content-type' : 'text/css'});

        var fileContents = fs.readFileSync('./views/style.css', {encoding: 'utf8'});
        response.write(fileContents);

        response.end();
    }

    else {
        console.log('loading html');
        response.writeHead(200, {'Content-Type': 'text/html'});

        view(response, 'index');
        response.end();
  }

}).listen(port, hostname);
console.log(`Server running at ${hostname}:${port}`);

//GET response Home -> index.html, display the form

var fs = require("fs");

function view(response, htmlFile){
  //Sync read from the template file
  var fileContents = fs.readFileSync('./views/' + htmlFile + '.html', {encoding: "utf8"});
  //Write out the contents to the response
  response.write(fileContents);
}