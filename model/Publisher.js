let mongoose = require("mongoose");

let publisherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: Number
});

let Publisher = mongoose.model("Publisher", publisherSchema);
module.exports  = Publisher;