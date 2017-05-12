//var RequestCache = require("./RequesCache.js");
var ImgProvider = require("./ImgProvider.js");
var DBBdgmodule = require("./DBBdgModule.js");
exports.getKakaoResponse = function() {
    var BdgInfo = DBBdgModule.getBdgInfo();
    return {
        "message":{
                "text": BdgInfo.name,
                "photo": {
                    "url": ImageProvider.getImg(DbgInfo.imgPath),
                    "width": 640,
                    "height": 480
                },
                "message_button": {
                    "label": "반갑습니다.",
                    "url": ":"+BdgInfo.id
                }
        }
    };
};
exports.getSimpleResponse = function() {

};