const KeywordModel = require('../models/keywordModel');
const UserRssMapSchema = require('../models/userRssMapModel');
const KeywordRssMapSchema = require('../models/keywordRssMapModel');
const RssModel = require('../models/rssModel');

class KeywordService{
    async createKeyword(word, userId){
        const newKeyword = await KeywordModel.create({userId: userId, word});
        const rssContainsNewKeyword = await RssModel.find({ $or: [ {title: {$regex: word}}, {description: {$regex: word}} ] });

        if(rssContainsNewKeyword.length){
            for (const rss of rssContainsNewKeyword) {
                const userRssMap = await UserRssMapSchema.find({userId: userId, rssId: rss._id});
                if(!userRssMap.length){
                    await UserRssMapSchema.create({
                        userId: userId,
                        rssId: rss._id
                    });
                }

                await KeywordRssMapSchema.create({
                    keywordId: newKeyword._id,
                    rssId: rss._id
                });
            }
        }

        return newKeyword;
    }

    async deleteKeywordById(_id, userId){
        const rssContainsKeyword = await KeywordRssMapSchema.find({keywordId: _id});
        try {
            await KeywordModel.deleteOne({userId: userId, _id: _id});
            await KeywordRssMapSchema.deleteMany({keywordId: _id});

            if(rssContainsKeyword.length){
                const userKeywords = await KeywordModel.find({
                    userId: userId
                });

                for (const rss of rssContainsKeyword) {
                    const rssKeywordMap = await KeywordRssMapSchema.find({
                        keywordId: { $in: userKeywords.map(keyword => keyword._id) },
                        rssId: rss.rssId
                    });

                    if(!rssKeywordMap.length){
                        await UserRssMapSchema.deleteOne({
                            userId: userId,
                            rssId: rss.rssId
                        })
                    }
                }
            }
        }catch (e) {
            return false;
        }

        return _id;
    }
}

module.exports = new KeywordService();