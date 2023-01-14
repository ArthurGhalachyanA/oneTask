const parser = require('xml2js').Parser();

class xmlParserHelper{
    constructor(){}

    xmlToJson(xmlData){
        return new Promise((resolve) => {
            parser.parseString(xmlData, (err, result) => {
                if (err)
                    throw new Error(err);
                resolve(result);
            });
        });
    }
}

module.exports = new xmlParserHelper();