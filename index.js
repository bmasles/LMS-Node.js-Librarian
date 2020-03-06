let mongoose = require('mongoose');
const express = require('express');
require('./model/Book').default;
require('./model/Author');
require('./model/Copy');
require('./model/Genre');
require('./model/LibraryBranch');
require('./model/Publisher');
let routes = require('./controller/LibrarianController');
mongoose.connect('mongodb+srv://burke:Burke725138@lms-oa1fv.mongodb.net/test?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use('/', routes);

    app.listen(port);
});