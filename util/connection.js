let config = require('../config/config');
let mongoose = require('mongoose');

mongoose.connect(config.mongoURI[process.env.NODE_ENV], { useNewUrlParser: true, useUnifiedTopology: true });