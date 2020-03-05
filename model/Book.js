let mongoose = require("mongoose");
let Author = require("./Author");
let Genre = require("./Genre");
let Publisher = require("./Publisher");

let bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [Author.schema],
    genres: [Genre.schema],
    publisher: Publisher.schema
});
let Book = mongoose.model("Book", bookSchema);
module.exports  = Book;
