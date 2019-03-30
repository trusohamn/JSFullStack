const http = require('http');
const router = require("./router.js");

const hostname = '127.0.0.1'; //not used for heroku depl
const port = process.env.PORT || 3000;

//create web server
http.createServer(function (request, response) {
  router.css(request, response);
  router.home(request, response);
  router.formProcess(request, response);
}).listen(port);
console.log(`Server running at :${port}`);
