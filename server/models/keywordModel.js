const {Schema, model} = require('mongoose');

const KeywordSchema = Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    word: {type: String, required: true},
});

module.exports = model('Keyword', KeywordSchema);