const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    originalurl: {
        type: String,
        trim: true,
    },
    shortened: {
        type: String,
        trim: true,
    },
    Dummyid: {
        type: String,
        trim: true,
    }
})

const Urls = mongoose.model('Urls', urlSchema);
module.exports = Urls;