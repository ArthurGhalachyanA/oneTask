const tokenService = require('../services/tokenService');

module.exports = function (authorizationHeader){
    try {
        if(!authorizationHeader)
            return null;

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken)
            return null;

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData)
            return null;

        return userData;
    }catch (e) {
        return null;
    }
};