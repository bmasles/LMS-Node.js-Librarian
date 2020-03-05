let mongoose = require("mongoose");

let authorSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

let Author = mongoose.model("Author", authorSchema);
module.exports  = Author;