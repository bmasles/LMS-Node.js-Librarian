const express = require('express');
let mongoose = require('mongoose');
require('./model/Book').default;
require('./model/Author');
require('./model/Copy');
require('./model/Genre');
require('./model/LibraryBranch');
require('./model/Publisher');
let bookService = require('./service/bookService');
let copyService = require('./service/copiesService');
let libraryBranchService = require('./service/libraryBranchService');
const app = express();
const port = 3000;

app.get('/librarian/books', function (req, res) {
    bookService.read().then( function(books) {
        res.send(books);
    });
});

app.get('/librarian/books/:id', function (req, res) {
    bookService.read(id).then( function(book) {
        res.send(book);
    })
});

app.get('/librarian/libraryBranches', function (req, res) {

});

app.get('/librarian/libraryBranches/:id', function (req, res) {

});

app.post('/librarian/libraryBranches', function (req, res) {

});

app.put('/librarian/libraryBranches/:id', function (req, res) {

});

app.delete('/librarian/libraryBranches/:id', function (req, res) {

});

app.get('/librarian/copies', function (req, res) {

});

app.get('/librarian/copies/:id', function (req, res) {

});

app.post('/librarian/copies', function (req, res) {

});

app.put('/librarian/copies/:id', function (req, res) {

});

app.delete('/librarian/copies/:id', function (req, res) {

});

app.listen(port);