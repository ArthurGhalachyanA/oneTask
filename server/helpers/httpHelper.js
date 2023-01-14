const http = require('http');

class httpHelper{
    constructor(){}

    getXml(url){
        return new Promise((resolve) => {
            http.get(url, res => {
                let data = '';
                res.on('data', stream => data += stream);
                res.on('end', () => resolve(data));
            });
        });
    }
}

module.exports = new httpHelper();