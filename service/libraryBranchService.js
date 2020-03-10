let libraryBranchDao = require('../dao/libraryBranchDao');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let librarybranchesService = {
    read: function () {
        return libraryBranchDao.read();
    },
    readById: function (id) {
        try {
            return libraryBranchDao.readById(id);
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError' };
            }
        }
    },
    create: async function (libraryBranch) {
        try {
            const libraryBranchId = libraryBranchDao.create(libraryBranch, transaction);
            await transaction.run();
            return libraryBranchId;
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError' };
            }
        }
    },
    delete: async function (id) {
        try {
            libraryBranchDao.delete(id, transaction);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.name == 'ValidationError' || error.name == 'CastError' || error.error.message == 'Entity not found') {
                throw error;
            }
            else {
                console.log(error.error.message);
                throw { name: 'ServerError' };
            }
        }
    },
    update: async function (id, newLibraryBranch) {
        try {
            libraryBranchDao.update(id, newLibraryBranch, transaction);
            await transaction.run();
        } catch (error) {
            await transaction.rollback().catch(console.error);
            transaction.clean();
            if (error.name == 'ValidationError' || error.name == 'CastError') {
                throw error;
            }
            else {
                throw { name: 'ServerError' };
            }
        }
    }
}

module.exports = librarybranchesService;