const http = require('http');
const querystring = require("querystring");

const hostname = '127.0.0.1'; //not used for heroku depl
const port = process.env.PORT || 3000;

//create web server
http.createServer(function (request, response) {
  if (request.method.toLowerCase() === 'get') {
    if (request.url === '/style.css') {
      //loading the css, call the url /stye.css
      console.log('loading css')

      response.writeHead(200, { 'Content-type': 'text/css' });

      var fileContents = fs.readFileSync('./views/style.css', { encoding: 'utf8' });
      response.write(fileContents);

      response.end();
    }

    else {
      console.log('loading html');
      response.writeHead(200, { 'Content-Type': 'text/html' });

      view(response, 'index');
      response.end();
    }
  } else {
    //POST
    //from form
    console.log('calling POST');
    //get the post data from body
    request.on("data", function(postBody) {
      //extract the username
      var query = querystring.parse(postBody.toString());
      console.dir(query);
      view(response, 'result', query);
      //redirect to /:username
      //response.writeHead(303, {"Location" : '/' + query.username});
      response.end();  
    });
  }

}).listen(port);
console.log(`Server running at :${port}`);

//GET response Home -> index.html, display the form

var fs = require("fs");

function view(response, htmlFile, values) {
  //Sync read from the template file
  var fileContent = fs.readFileSync('./views/' + htmlFile + '.html', { encoding: "utf8" });
  //Write out the contents to the response
  fileContent = replaceWithValues(values, fileContent);
  response.write(fileContent);
}

function replaceWithValues(values, template) {
  for(var key in values) {
    console.log(key);
    //Replace all {{key}} with the value from the values object
    template = template.replace("##" + key + "##", values[key]);
  }
  return template;
}
