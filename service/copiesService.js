let mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let copiesService = {
    read: function () {
        return mongoose.model('Copy').find().populate('book').populate('libraryBranch').exec();
    },
    readById: function (id) {
        try {
            return mongoose.model('Copy').findById({ _id: id }).populate('book').populate('libraryBranch').exec();
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    },
    create: async function (copy) {
        try {
            const copyId = transaction.insert(mongoose.model('Copy').modelName, copy);
            await transaction.run();
            return copyId;
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
            transaction.remove(mongoose.model('Copy').modelName, id);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.name == 'ValidationError' || error.name == 'CastError' || error.error.message == 'Entity not found') {
                throw error;
            }
            else {
                throw { name: 'ServerError'};
            }
        }
    },
    update: async function (id, newCopy) {
        try {
            transaction.update(mongoose.model('Copy').modelName, id, newCopy);
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

module.exports = copiesService;