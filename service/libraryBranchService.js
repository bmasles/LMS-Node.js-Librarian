let mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let librarybranchesService = {
    read: function () {
        return mongoose.model('LibraryBranch').find().exec();
    },
    readById: function (id) {
        return mongoose.model('LibraryBranch').findById({ _id: id }).exec();
    },
    create: async function (libraryBranch) {
        try {
            const libraryBranchId = transaction.insert(mongoose.model('LibraryBranch').modelName, libraryBranch);
            await transaction.run();
            return libraryBranchId;
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
        // return mongoose.model('LibraryBranch').create(libraryBranch).exec();
    },
    delete: async function (id) {
        try {
            transaction.remove(mongoose.model('LibraryBranch').modelName, id);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
    },
    update: async function (id, newLibraryBranch) {
        try {
            transaction.update(mongoose.model('LibraryBranch').modelName, id, newLibraryBranch);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
    }
}

module.exports = librarybranchesService;