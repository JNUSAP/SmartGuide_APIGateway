var BdgSearchModule = require("./BdgSearchModule.js");
exports.getResponse = function(messageType, req, callback) {
    if (messageType == "kakao") {
        BdgSearchModule.getKakaoResponse(req, function(result) {
            callback(result);
        });
    }

    if (messageType == "sms")
        return BdgSearchModule.getSimpleResponse(req);
};