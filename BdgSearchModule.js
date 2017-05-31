//var RequestCache = require("./RequesCache.js");
var ImgProvider = require("./ImgProvider.js");
var DBBdgModule = require("./DBBdgModule.js");
var KakaoResponse = require("./kakaotalkresponse.js");
var Building = require("./building.js");
exports.getKakaoResponse = function(req) {
    if (req.type != "text") return new KakaoResponse(-1); // 사진->null
    var BdgInfo = DBBdgModule.getInfoByNickName(req.content);

    return new KakaoResponse(BdgInfo.BuildingId, BdgInfo.BuildingName, BdgInfo);
}
exports.getSimpleResponse = function(req) {
    var BdgId = DBBdgModule.getIdByNickName(req.content);
    return {
        "message": {
            "text": BdgId
        }
    };
};
