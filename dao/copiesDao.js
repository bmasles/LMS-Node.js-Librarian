let mongoose = require('mongoose');
require('../model/Book');
require('../model/Copy');
require('../model/LibraryBranch');

let copiesDao = {
    read: function () {
        return mongoose.model('Copy').find().populate('book').populate('libraryBranch').exec();
    },
    readById: function (id) {
        return mongoose.model('Copy').findById({ _id: id }).populate('book').populate('libraryBranch').exec();
    },
    create: async function (copy, transaction) {
        return transaction.insert(mongoose.model('Copy').modelName, copy);
    },
    delete: async function (id, transaction) {
        transaction.remove(mongoose.model('Copy').modelName, id);
    },
    update: async function (id, newCopy, transaction) {
        transaction.update(mongoose.model('Copy').modelName, id, newCopy);
    }
}

module.exports = copiesDao;