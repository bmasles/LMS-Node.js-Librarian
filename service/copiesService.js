let mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let copiesService = {
    read: function () {
        return mongoose.model('Copy').find().exec();
    },
    readById: function (id) {
        return mongoose.model('Copy').findById({ _id: id }).exec();
    },
    create: async function (copy) {
        try {
            const copyId = transaction.insert(mongoose.model('Copy').modelName, copy);
            await transaction.run();
            return copyId;
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
        // return mongoose.model('Copy').create(copy).exec();
    },
    delete: async function (id) {
        try {
            transaction.remove(mongoose.model('Copy').modelName, id);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
    },
    update: async function (id, newCopy) {
        try {
            transaction.update(mongoose.model('Copy').modelName, id, newCopy);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
        }
    }
}

module.exports = copiesService;