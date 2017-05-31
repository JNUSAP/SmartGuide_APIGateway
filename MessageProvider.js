var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(messageType, req) {
    console.log("getResponse Called with : " + req);
    if (messageType == "kakao")
        return BdgSearchModule.getKakaoResponse(req);
    if (messageType == "sms")
        return BdgSearchModule.getSimpleResponse(req);
};