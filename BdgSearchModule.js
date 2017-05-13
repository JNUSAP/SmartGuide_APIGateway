//var RequestCache = require("./RequesCache.js");
var ImgProvider = require("./ImgProvider.js");
var DBBdgModule = require("./DBBdgModule.js");
exports.getKakaoResponse = function() {
    var BdgInfo = DBBdgModule.getBdgInfo();
    return {
        "message": {
            "text": BdgInfo.name,
            "photo": {
                "url": "/0", // ImgProvider.getImg(DbgInfo.imgPath)0
                "width": 640,
                "height": 480
            },
            "message_button": {
                "label": "반갑습니다.",
                "url": ":" + BdgInfo.id
            }
        }
    };
};
exports.getSimpleResponse = function() {

};