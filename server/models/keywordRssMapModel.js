const {Schema, model} = require('mongoose');

const KeywordRssMapSchema = Schema({
    keywordId: {type: Schema.Types.ObjectId, ref: 'Keyword'},
    rssId: {type: Schema.Types.ObjectId, ref: 'Rss'}
});

module.exports = model('KeywordRssMap', KeywordRssMapSchema);