const {Schema, model} = require('mongoose');

const UserRssMapSchema = Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    rssId: {type: Schema.Types.ObjectId, ref: 'Rss'},
    wasSeenStatus: {type: Number, default: 0}
});

module.exports = model('UserRssMap', UserRssMapSchema);