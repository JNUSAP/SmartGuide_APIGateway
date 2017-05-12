var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(req, messageType) {
    if (messageType == "kakao")
        return BdgSearchModule.getKakaoResponse();
    if (messageType == "sms")
        return BdgSearchModule.getSimpleResponse();
};