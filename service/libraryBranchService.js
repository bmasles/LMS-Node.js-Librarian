let mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let librarybranchesService = {
    read: function () {
        return mongoose.model('LibraryBranch').find().populate('copies').exec();
    },
    readById: function (id) {
        try {
            return mongoose.model('LibraryBranch').findById({ _id: id }).populate('copies').exec();
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    },
    create: async function (libraryBranch) {
        try {
            const libraryBranchId = transaction.insert(mongoose.model('LibraryBranch').modelName, libraryBranch);
            await transaction.run();
            return libraryBranchId;
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    },
    delete: async function (id) {
        try {
            transaction.remove(mongoose.model('LibraryBranch').modelName, id);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.name == 'ValidationError' || error.name == 'CastError' || error.error.message == 'Entity not found') {
                throw error;
            }
            else {
                console.log(error.error.message);
                throw { name: 'ServerError'};
            }
        }
    },
    update: async function (id, newLibraryBranch) {
        try {
            transaction.update(mongoose.model('LibraryBranch').modelName, id, newLibraryBranch);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    }
}

module.exports = librarybranchesService;