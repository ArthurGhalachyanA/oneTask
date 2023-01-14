const apiResponse = require('../helpers/apiResponse');
const KeywordModel = require('../models/keywordModel');
const KeywordService = require('../services/keywordService');
const UserRssMapSchema = require('../models/userRssMapModel');
const KeywordRssMapSchema = require('../models/keywordRssMapModel');
const {validationResult} = require('express-validator');
const socketService = require('../services/socketService');

class keywordController{
    async getKeywords(req, res){
        const response = new apiResponse();

        response.keywords = await KeywordModel.find({userId: req.user.id});

        res.json(response);
    }

    async getKeywordById(req, res){
        const response = new apiResponse();
        const {_id} = req.query;

        response.keyword = await KeywordModel.findOne({_id, userId: req.user.id});

        if(!response.keyword)
            return res.status(204).json(response);

        res.json(response);
    }

    async createKeyword(req, res){
        const {word} = req.body;
        const response = new apiResponse();

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            response.validationErrors = errors.array();

            return res.status(400).json(response);
        }

        const keyword = await KeywordModel.findOne({userId: req.user.id, word});
        if(keyword){
            response.validationErrors.push({param: 'word', msg: 'Word already exists'});

            return res.status(400).json(response);
        }

        response.newKeyword = await KeywordService.createKeyword(word.trim(), req.user.id);

        const newRssCount = await UserRssMapSchema.find({userId: req.user.id, wasSeenStatus: 0}).count();
        if(newRssCount)
            socketService.sendNewRssCountTo(req.user.id, newRssCount);

        return res.status(201).json(response);
    }

    async deleteKeyword(req, res){
        const response = new apiResponse();
        const {_id} = req.body;

        const deletedKeyword = await KeywordService.deleteKeywordById(_id, req.user.id);

        if(!deletedKeyword)
            return res.status(204).json(response);

        return res.status(202).json(response);
    }

    async updateKeyword(req, res){
        const {_id, word} = req.body;
        const response = new apiResponse();

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            response.validationErrors = errors.array();
            return res.status(400).json(response);
        }

        const deletedKeyword = await KeywordService.deleteKeywordById(_id, req.user.id);
        if(!deletedKeyword)
            return res.status(400).json(response);

        response.newKeyword = await KeywordService.createKeyword(word.trim(), req.user.id);

        const newRssCount = await UserRssMapSchema.find({userId: req.user.id, wasSeenStatus: 0}).count();
        if(newRssCount)
            socketService.sendNewRssCountTo(req.user.id, newRssCount);

        res.status(201).json(response);
    }
}

module.exports = new keywordController();