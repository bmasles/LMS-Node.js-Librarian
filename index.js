let mongoose = require('mongoose');
if (process.env.NODE_ENV != 'test') {
    process.env.NODE_ENV = 'development';
}
require('./util/connection');
const express = require('express');
let routes = require('./controller/LibrarianController');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const app = express();
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log('Connected to database');
    const port = 3000;

    app.use(express.json());
    app.use(bodyParser.xml());
    app.use('/', routes);

});
module.exports = app.listen(3000);