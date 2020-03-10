let bookDao = require('../dao/bookDao');

let bookService = {
    read: function() {
        return bookDao.read();
    },
    readById: function(id) {
        try {
            return bookDao.readById(id);
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'CastError' ) {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    }
}

module.exports = bookService;