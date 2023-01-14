const UserRssMapModel = require('../models/userRssMapModel');
const apiResponse = require('../helpers/apiResponse');

class RssController{
    async getRss(req, res){
        const response = new apiResponse();

        response.rss = await UserRssMapModel.aggregate([
            {
                $lookup: {
                    from: "rsses",
                    localField: "rssId",
                    foreignField: "_id",
                    as: "rssRef",
                },
            },
            {$unwind: '$rssRef'},
        ]);

        try {
            await UserRssMapModel.updateMany(
                {userId: req.user.id, },
                {$set :{wasSeenStatus : 1}}
            );
        }catch (e) {
            return res.status(400).json(response);
        }

        return res.json(response);
    }
}

module.exports = new RssController();