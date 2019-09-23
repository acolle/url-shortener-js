const mongoose = require('mongoose');

const urlShortenSchema = new mongoose.Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String
}, {
  timestamps: true
});

mongoose.model('UrlShorten', urlShortenSchema);
