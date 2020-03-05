let mongoose = require("mongoose");

let copiesSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    libraryBranch: { type: mongoose.Schema.Types.ObjectId, ref: 'LibraryBranch', required: true },
    amount: { type: Number, required: true }
});

let Copy = mongoose.model("Copy", copiesSchema);
module.exports  = Copy;