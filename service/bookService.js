let mongoose = require('mongoose');

let bookService = {
    read: function() {
        return mongoose.model('Book').find().exec();
    },
    readById: function(id) {
        return mongoose.model('Book').findById({ _id: id}).exec();
    }
}

module.exports = bookService;