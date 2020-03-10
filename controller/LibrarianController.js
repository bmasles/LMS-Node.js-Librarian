let expressRouter = require('express').Router;
let router = expressRouter();
let convert = require('xml-js');
let bookService = require('../service/bookService');
let copyService = require('../service/copiesService');
let libraryBranchService = require('../service/libraryBranchService');

router.get('/librarian/books', function (req, res) {
    bookService.read().then(function (books) {
        let result = '';
        res.format({
            json: function() {res.send(books);},
            xml: function() {
                books.forEach(book => {
                    result += convert.js2xml(book.toObject(), {compact: true, ignoreComment: true, spaces: 4});
                });
                res.send(result);
            }
        })
    }).catch( function (err) {
        console.log(err);
        res.status(500);
        res.send();
    });
});

router.get('/librarian/books/:id', function (req, res) {
    bookService.readById(req.params.id).then(function (book) {
        if (!book) {
            res.status(404);
            res.send('Could not find book by that id');
        }
        else res.send(book);
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.get('/librarian/libraryBranches', function (req, res) {
    libraryBranchService.read().then(function (libraryBranches) {
        res.send(libraryBranches);
    });
});

router.get('/librarian/libraryBranches/:id', function (req, res) {
    libraryBranchService.readById(req.params.id).then(function (libraryBranch) {
        if (!libraryBranch) {
            res.status(404);
            res.send('Could not find libraryBranch by that id');
        }
        else res.send(libraryBranch);
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.post('/librarian/libraryBranches', function (req, res) {
    libraryBranchService.create(req.body).then(function (id) {
        res.append('Location', 'localhost:3000/librarian/libraryBranches/' + id);
        res.status(201);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.put('/librarian/libraryBranches/:id', function (req, res) {
    libraryBranchService.update(req.params.id, req.body).then(function () {
        res.status(204);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.delete('/librarian/libraryBranches/:id', function (req, res) {
    libraryBranchService.delete(req.params.id).then(function () {
        res.status(204);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.get('/librarian/copies', function (req, res) {
    copyService.read().then(function (copies) {
        res.send(copies);
    });
});

router.get('/librarian/copies/:id', function (req, res) {
    copyService.readById(req.params.id).then(function (copy) {
        if (!copy) {
            res.status(404);
            res.send('Could not find copy by that id');
        }
        else res.send(copy);
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        if (err.name == 'Not Found') {
            res.status(404);
            res.send(err.message);
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.post('/librarian/copies', function (req, res) {
    copyService.create(req.body).then(function (id) {
        res.append('Location', 'localhost:3000/librarian/copies/' + id);
        res.status(201);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.put('/librarian/copies/:id', function (req, res) {
    copyService.update(req.params.id, req.body).then(function () {
        res.status(204);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

router.delete('/librarian/copies/:id', function (req, res) {
    copyService.delete(req.params.id).then(function () {
        res.status(204);
        res.send();
    }).catch( function (err) {
        if (err.name == 'ServerError') {
            res.status(500);
            res.send();
        }
        if (err.name == 'Not Found') {
            res.status(404);
            res.send(err.message);
        }
        else {
            res.status(400);
            res.send(err.message);
        }
    });
});

module.exports = router;