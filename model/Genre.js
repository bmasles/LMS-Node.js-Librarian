let mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

let Genre = mongoose.model("Genre", genreSchema);
module.exports  = Genre;