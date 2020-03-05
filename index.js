let mongoose = require('mongoose');
const express = require('express');
require('./model/Book').default;
require('./model/Author');
require('./model/Copy');
require('./model/Genre');
require('./model/LibraryBranch');
require('./model/Publisher');
let routes = require('./controller/LibrarianController');
mongoose.connect('mongodb+srv://burke:Burke725138@lms-oa1fv.mongodb.net/test?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use('/', routes);

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