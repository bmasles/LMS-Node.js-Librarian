let mongoose = require('mongoose');

let bookService = {
    read: function() {
        return mongoose.model('Book').find().exec();
    },
    readById: function(id) {
        try {
            return mongoose.model('Book').findById({ _id: id }).exec();
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    }
}

module.exports = bookService;