const mongoose = require('mongoose');
const validator = require('validator');

const urlSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    originalurl: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isURL(value, { require_tld: true })) {
                throw new Error("Invalid URL. Please provide a valid URL.");
            }
        }
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