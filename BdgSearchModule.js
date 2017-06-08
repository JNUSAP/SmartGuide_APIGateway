//var RequestCache = require("./RequesCache.js");
var DBBdgModule = require("./DBBdgModule.js");
var KakaoResponse = require("./kakaotalkresponse.js");
var Building = require("./building.js");
exports.getKakaoResponse = function(req, callback) {
    if (req.type != "text") return new KakaoResponse(-1); // 사진->null
    DBBdgModule.getInfoByNickName(req.content).then(function(BdgInfo) {
        console.log("Response: ");
        console.log(BdgInfo);
        var message = new KakaoResponse(BdgInfo.buildingId, BdgInfo.buildingName, BdgInfo.buildingImage);
        console.log(message);
        return callback(message);
    }).catch(function() {
        console.log("getKakaoResponse promise return error");
        return new KakaoResponse(-1);
    });
}
exports.getSimpleResponse = function(req) {
    var BdgId = DBBdgModule.getIdByNickName(req.content);
    return {
        "message": {
            "text": BdgId
        }
    };
};