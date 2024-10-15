const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27018/url-shortener');
//mongoose.connect(`${process.env.MONGODB_URL}/url-shortener`);