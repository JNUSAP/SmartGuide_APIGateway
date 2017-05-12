//var RequestCache = require("./RequesCache.js");
//var ImgProvider = require("./ImgProvider.js");
//var DBBdgmodule = require("./DBBdgModule.js");
exports.getKakaoResponse = function() {
    return {
        "message":{
                "text": "안녕하세요.",
                "photo": {
                    "url": "https://hello.photo.src",
                    "width": 640,
                    "height": 480
                },
                "message_button": {
                    "label": "반갑습니다.",
                    "url": "http://hello.world.com/example"
                }
        }
    };
};
exports.getSimpleResponse = function() {

};