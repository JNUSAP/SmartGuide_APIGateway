var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(req, messageType) {
    if (messageType == "kakao")
        BdgSearchModule.getKakaoResponse();
    if (messageType == "sms")
        BdgSearchModule.getSimpleResponse();
};