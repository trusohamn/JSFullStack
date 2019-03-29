var http = require('http');

//create web server
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  view(response, 'index');
  response.end();
  
}).listen(3000, '127.0.0.1');
console.log('Server running at localhost');

//GET response Home -> index.html, display the form

var fs = require("fs");

function view(response, htmlFile){
  //Sync read from the template file
  var fileContents = fs.readFileSync('./views/' + htmlFile + '.html', {encoding: "utf8"});
  //Write out the contents to the response
  response.write(fileContents);


}