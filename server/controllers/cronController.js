const httpHelper = require('../helpers/httpHelper');
const xmlParserHelper = require('../helpers/xmlParserHelper');
const KeywordModel = require('../models/keywordModel');
const socketService = require('../services/socketService');
const RssModel = require('../models/rssModel');
const UserRssMapSchema = require('../models/userRssMapModel');
const KeywordRssMapSchema = require('../models/keywordRssMapModel');

class cronController{
    async insertRss(){
        try {
            let usersHaveNewRss = new Set();
            const xmlData = await httpHelper.getXml("http://feeds.bbci.co.uk/news/rss.xml");
            const jsonData = await xmlParserHelper.xmlToJson(xmlData);
            const results = jsonData.rss.channel[0].item;
            const allKeywords = await KeywordModel.find();

            for (const rss of results) {
                let usersHaveMapping = [];

                if((await RssModel.find({link: rss.link[0]})).length)
                    continue;

                const newRss = await RssModel.create({
                    title: rss.title[0],
                    description: rss.description[0],
                    link: rss.link[0],
                    pubDate: rss.pubDate[0]
                });

                for (const keyword of allKeywords) {
                    if(rss.title[0].indexOf(keyword.word) < 0 && rss.description[0].indexOf(keyword.word) < 0)
                        continue;

                    if(!usersHaveMapping[keyword.userId]){
                        await UserRssMapSchema.create({
                            userId: keyword.userId,
                            rssId: newRss._id
                        });
                    }

                    await KeywordRssMapSchema.create({
                        keywordId: keyword._id,
                        rssId: newRss._id
                    });

                    usersHaveMapping.push(keyword.userId);
                    usersHaveNewRss.add(keyword.userId.toString());
                }
            }

            usersHaveNewRss.forEach(async userId => {
                const newRssCount = await UserRssMapSchema.find({userId: userId, wasSeenStatus: 0}).count();
                socketService.sendNewRssCountTo(userId, newRssCount);
            });
        }catch (e) {
            //log errors
        }
    }
}

module.exports = new cronController();