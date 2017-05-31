var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(messageType, req) {
    if (messageType == "kakao")
        return BdgSearchModule.getKakaoResponse(req);
    if (messageType == "sms")
        return BdgSearchModule.getSimpleResponse(req);
};