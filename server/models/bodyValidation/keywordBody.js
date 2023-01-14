const {body} = require("express-validator");

const keywordCreateUpdateBody = [
    body('word').notEmpty().trim().withMessage('word is require')
];

module.exports = {
    keywordCreateUpdateBody
};