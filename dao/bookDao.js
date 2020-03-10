let mongoose = require('mongoose');
require('../model/Book');
require('../model/Author');
require('../model/Genre');
require('../model/Publisher');

let bookDao = {
    read: function() {
        return mongoose.model('Book').find().exec();
    },
    readById: function(id) {
        return mongoose.model('Book').findById({ _id: id }).exec();
    }
}

module.exports = bookDao;