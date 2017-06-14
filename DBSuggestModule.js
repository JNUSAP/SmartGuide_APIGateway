const connector = require('./DBConnector.js');
const BdgSuggest = require('./bdgSuggest.js');
const util = require('util');

exports.getSuggest = function(id) {
    var query = util.format('SELECT * FROM suggestion WHERE suggestId = %d;', id);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) {
                console.log("getSuggest : reject sent");
                reject(new Building(-1));
            }
            if (result.suggestionIsDelete == 1) return BdgSuggest(undefined);
            var suggest = new BdgSuggest(result.suggestionId, result.suggestionTitle, result.suggestionText);
            console.log("suggest:");
            console.log(building);
            resolve(building);
        });
    }).catch(function() {
        console.log("getInfo promised return error");
        return new Building(-1);
    });
};
exports.addSuggest = function(suggest) {
    var query = util.format('INSERT INTO suggestion(suggestionTitle, suggestionText) VALUES (\'%s\', \'%s\');',
        suggest.suggestTitle, suggest.suggestContent);
    connector.query(query);
};
exports.deleteSuggest = function(id) {
    var query = util.format("UPDATE suggestion SET suggestionIsDelete = TRUE, WHERE suggestionId = %d;", id);
    connector.query(query);
};