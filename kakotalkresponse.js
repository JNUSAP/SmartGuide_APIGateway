var DBModule = require('./db.js');

var getresponse = function(request) {

    var responseInfo = DBMoudle.getBuildingInfo(request.text);
    return {
        'text': responseInfo.getText(),
        'photo': responseInfo.getPhotoPath(),
        'url': responseInfo.getUrl()
    };
};