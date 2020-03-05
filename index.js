let mongoose = require('mongoose');
const express = require('express');
require('./model/Book').default;
require('./model/Author');
require('./model/Copy');
require('./model/Genre');
require('./model/LibraryBranch');
require('./model/Publisher');
let bookService = require('./service/bookService');
let copyService = require('./service/copiesService');
let libraryBranchService = require('./service/libraryBranchService');
mongoose.connect('mongodb+srv://burke:Burke725138@lms-oa1fv.mongodb.net/test?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    const app = express();
    const port = 3000;

    app.get('/librarian/books', function (req, res) {
        bookService.read().then(function (books) {
            res.send(books);
        });
    });

    app.get('/librarian/books/:id', function (req, res) {
        bookService.readById(req.params.id).then(function (book) {
            res.send(book);
        });
    });

    app.get('/librarian/libraryBranches', function (req, res) {
        libraryBranchService.read().then(function (libraryBranches) {
            res.send(libraryBranches);
        });
    });

    app.get('/librarian/libraryBranches/:id', function (req, res) {
        libraryBranchService.readById(req.params.id).then(function (libraryBranch) {
            res.send(libraryBranch);
        });
    });

    app.post('/librarian/libraryBranches', function (req, res) {

    });

    app.put('/librarian/libraryBranches/:id', function (req, res) {

    });

    app.delete('/librarian/libraryBranches/:id', function (req, res) {

    });

    app.get('/librarian/copies', function (req, res) {
        copyService.read().then(function (copies) {
            res.send(copies);
        });
    });

    app.get('/librarian/copies/:id', function (req, res) {
        copyService.readById(req.params.id).then(function (copy) {
            res.send(copy);
        });
    });

    app.post('/librarian/copies', function (req, res) {

    });

    app.put('/librarian/copies/:id', function (req, res) {

    });

    app.delete('/librarian/copies/:id', function (req, res) {

    });

    app.listen(port);



    // copyService.delete("5e604cf09cd2f14fa49b3551");

    // copyService.create({
    //     book: "5e601e8fd4b596424400f246",
    //     libraryBranch: "5e6036df73a1f2446839276d",
    //     amount: 18
    // }).then(function(copyId) {
    //     console.log(copyId);
    // })

    // mongoose.model('LibraryBranch').create({
    //     name: "Fairfax",
    //     address: "456 rd.",
    //     copies: []
    // }, function (err, libraryBranch) {
    //     if (err) return console.log(err);
    //     console.log("Branch Created");
    // });

    // mongoose.model('Book').create({
    //     title: "My Second Book",
    //     authors: [{ name: "Burke" }, { name: "Nicolette"}],
    //     genres: [{ name: "Action" }],
    //     publisher: {
    //         name: "Jack's Books",
    //         address: "123 st.",
    //         phone: 1234567899
    //     }
    // }, function (err, book) {
    //     if (err) return handleError(err);
    //     console.log("Did it work???");
    // });
});