let copiesDao = require('../dao/copiesDao');
let libraryBranchDao = require('../dao/libraryBranchDao');
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();

let copiesService = {
    read: function () {
        return copiesDao.read();
    },
    readById: function (id) {
        try {
            return copiesDao.readById(id);
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
            const copyId = copiesDao.create(copy, transaction);
            let libraryBranch = await libraryBranchDao.readById(copy.libraryBranch);
            if (!libraryBranch) throw { name: "Not Found", message: "Could not find libararyBranch by that id"};
            libraryBranch.copies.push(copyId);
            libraryBranchDao.update(libraryBranch.id, libraryBranch, transaction);
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
            let copy = await copiesDao.readById(id);
            if (!copy) throw { name: "Not Found", message: "Could not find Copy by that id"};
            let libraryBranch = await libraryBranchDao.readById(copy.libraryBranch.id);
            if (!libraryBranch) throw { name: "Not Found", message: "Could not find libararyBranch by that id"};
            libraryBranch.copies.splice(libraryBranch.copies.indexOf(id), 1);
            libraryBranchDao.update(libraryBranch.id, libraryBranch, transaction);
            copiesDao.delete(id, transaction);
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
            copiesDao.update(id, newCopy, transaction);
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