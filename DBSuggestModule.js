const connector = require('./DBConnector.js');
const BdgSuggest = require('./bdgSuggest.js');
const util = require('util');

exports.getSuggest = function(id) {
    var query = util.format('SELECT * FROM suggestion WHERE idsuggestion= %d;', id);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined || result.suggestionIsDelete == 1) {
                console.log("getSuggest : reject sent");
                reject(new BdgSuggest(-1));
            }
            var suggest = new BdgSuggest(result.idsuggestion, result.suggestionTitle, result.suggestionText);
            console.log("suggest:");
            console.log(suggest);
            resolve(suggest);
        });
    }).catch(function() {
        console.log("getSuggest promised return error");
        return new BdgSuggest(-1);
    });
};
exports.addSuggest = function(suggest) {
    if (suggest == undefined || suggest.suggestTitle == undefined || suggest.suggestContent == undefined) {
        console.log("suggest Failed");
        return -1;
    }

    var query = util.format('INSERT INTO suggestion(suggestionTitle, suggestionText) VALUES (\'%s\', \'%s\');',
        suggest.suggestTitle, suggest.suggestContent);
    connector.query(query);
};
exports.deleteSuggest = function(id) {
    var query = util.format("UPDATE suggestion SET suggestionIsDelete = 1 WHERE idsuggestion = %d;", id);
    return connector.queryAll(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            /*Mysql 모듈의 OKPacket*/
            if (result.affectedRows >= 1) {
                resolve(true);
            }
            reject(false);
        });
    }).catch(function() {
        console.log("deleteSuggest");
        return false;
    });
};