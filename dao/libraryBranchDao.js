let mongoose = require('mongoose');
require('../model/Copy');
require('../model/LibraryBranch');

let libraryBranchDao = {
    read: function () {
        return mongoose.model('LibraryBranch').find().populate('copies').exec();
    },
    readById: function (id) {
        return mongoose.model('LibraryBranch').findById({ _id: id }).populate('copies').exec();
    },
    create: async function (libraryBranch, transaction) {
        return transaction.insert(mongoose.model('LibraryBranch').modelName, libraryBranch);
    },
    delete: async function (id, transaction) {
        transaction.remove(mongoose.model('LibraryBranch').modelName, id);
    },
    update: async function (id, newLibraryBranch, transaction) {
        transaction.update(mongoose.model('LibraryBranch').modelName, id, newLibraryBranch);
    }
}

module.exports = libraryBranchDao;