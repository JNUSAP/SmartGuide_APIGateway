var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(messageType) {
    if (messageType == "kakao")
        return BdgSearchModule.getKakaoResponse();
    if (messageType == "sms")
        return BdgSearchModule.getSimpleResponse();
};