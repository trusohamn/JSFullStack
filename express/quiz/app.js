const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3030;
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const mainRoutes = require('./routes');
app.use(mainRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
});