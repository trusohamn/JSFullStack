
//connect to treehouse API to get profile information

//import module from the same directory
const userProfile = require('./userProfile.js');

const users = ['martatrusohamn'];
//users.forEach(username => getTreehouseProfile(username));
users.forEach(userProfile.get);


