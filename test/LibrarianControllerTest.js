process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require("mongoose");

let app = require('../index');
let Book = require('../model/Book');
let Copy = require('../model/Copy');
let LibraryBranch = require('../model/LibraryBranch');
let should = chai.should();
chai.use(chaiHttp);

describe('Books', function () {
    //Book.collection.drop();

    this.beforeEach(function (done) {
        let newBook = new Book({
            title: "Test Book",
            authors: [{ name: "Burke" }, { name: "Nicolette" }],
            genres: [{ name: "Action" }],
            publisher: {
                name: "Jack's Books",
                address: "123 st.",
                phone: 1234567899
            }
        });
        newBook.save(function (err) {
            done();
        });
    });

    this.afterEach(function (done) {
        Book.collection.drop();
        done();
    });

    it('should read all the books from /books', function (done) {
        chai.request(app)
            .get('/librarian/books')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('authors');
                res.body[0].should.have.property('genres');
                res.body[0].should.have.property('publisher');
                res.body[0].title.should.equal('Test Book');
                res.body[0].authors[0].name.should.equal('Burke');
                res.body[0].authors[1].name.should.equal('Nicolette');
                res.body[0].genres[0].name.should.equal('Action');
                res.body[0].publisher.name.should.equal("Jack's Books");
                res.body[0].publisher.address.should.equal("123 st.");
                res.body[0].publisher.phone.should.equal(1234567899);
                done();
            })
    });

    it('should read a single book from /books', function (done) {
        let newBook = new Book({
            title: "Test Book 2",
            authors: [{ name: "Burke" }, { name: "Nicolette" }],
            genres: [{ name: "Action" }],
            publisher: {
                name: "Jack's Books",
                address: "123 st.",
                phone: 1234567899
            }
        });
        newBook.save(function (err, data) {
            chai.request(app)
                .get('/librarian/books/' + data.id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('authors');
                    res.body.should.have.property('genres');
                    res.body.should.have.property('publisher');
                    res.body.title.should.equal('Test Book 2');
                    res.body.authors[0].name.should.equal('Burke');
                    res.body.authors[1].name.should.equal('Nicolette');
                    res.body.genres[0].name.should.equal('Action');
                    res.body.publisher.name.should.equal("Jack's Books");
                    res.body.publisher.address.should.equal("123 st.");
                    res.body.publisher.phone.should.equal(1234567899);
                    done();
                });
        });
    });
})