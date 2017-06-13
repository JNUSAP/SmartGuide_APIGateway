//var RequestCache = require("./RequesCache.js");
var DBBdgModule = require("./DBBdgModule.js");
var KakaoResponse = require("./kakaotalkresponse.js");
var Building = require("./building.js");
const config = require("./config.json");
exports.getKakaoResponse = function(req, callback) {
    /*카카오톡 요청 */
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
    /*SMS 요청 */
    var BdgId = DBBdgModule.getIdByNickName(req.content);
    return {
        "message": {
            "text": config.host +"/bdg/"+ BdgId
        }
    };
};