const {Schema, model} = require('mongoose');

const RssSchema = Schema({
    title: {type: String, required: true},
    description: {type: String},
    link: {type: String, unique: true},
    pubDate: {type: String, required: true},
});

module.exports = model('Rss', RssSchema);