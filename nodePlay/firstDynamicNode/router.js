const querystring = require("querystring");

function home(request, response) {
    console.log('loaded home from router');
    if (request.url === '/' && request.method.toLowerCase() === 'get') {
        //GET HOME
        console.log('loading html of home');
        response.writeHead(200, { 'Content-Type': 'text/html' });

        view(response, 'head');
        view(response, 'form');
        view(response, 'footer');

        response.end();
    }
}

function css(request, response) {
    if (request.url === '/style.css') {
        //loading the css, call the url /stye.css
        console.log('loading css')

        response.writeHead(200, { 'Content-type': 'text/css' });

        var fileContents = fs.readFileSync('./views/style.css', { encoding: 'utf8' });
        response.write(fileContents);

        response.end();
    }
}

function formProcess(request, response) {
    if (request.url === '/' && request.method.toLowerCase() === 'post') {
        //POST
        //from form
        console.log('calling POST');
        //get the post data from body
        request.on("data", function (postBody) {
            //extract the username
            var query = querystring.parse(postBody.toString());
            console.dir(query);

            view(response, 'head');
            view(response, 'form');
            view(response, 'result', query);
            view(response, 'footer');
            //redirection from post to get
            //response.writeHead(303, {"Location" : '/' + });
            response.end();
        });
    }
}

//-------VIEW-----//

var fs = require("fs");

function view(response, htmlFile, values) {
  //Sync read from the template file
  var fileContent = fs.readFileSync('./views/' + htmlFile + '.html', { encoding: "utf8" });
  //Write out the contents to the response
  fileContent = replaceWithValues(values, fileContent);
  response.write(fileContent);
}

function replaceWithValues(values, template) {
  for (var key in values) {
    console.log(key);
    //Replace all {{key}} with the value from the values object
    template = template.replace("##" + key + "##", values[key]);
  }
  return template;
}

//-------EXPORT-----//
module.exports.home = home;
module.exports.css = css;
module.exports.formProcess = formProcess;


