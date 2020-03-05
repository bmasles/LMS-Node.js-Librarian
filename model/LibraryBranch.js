let mongoose = require("mongoose");

let libraryBranchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    copies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Copy' }]
});

let LibraryBranch = mongoose.model("LibraryBranch", libraryBranchSchema);
module.exports  = LibraryBranch;