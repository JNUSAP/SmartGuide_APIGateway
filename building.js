const DB = require("./DBBdgModule.js");
module.exports = function(id, name, path, longitude, latitude, msg1) {
    //인자 하나일 시 (DB에서 추출한)bdgInfo, 아닐 시 bdg
    if (name == undefined) return bdg(id);
    return bdg(id, name, path, longitude, latitude, msg1);
}

function bdg(bdgInfo) {
    // bdgInfo === number 이면 bdgInfo == id이므로 DB에서 id에 따른 bdgInfo 불러움
    if (typeof(bdgInfo) === number) return bdg(DB.getInfo(id));

    this._id = bdgInfo.id;
    this.buildingName = bdgInfo.name;
    this.buildingImage = bdgInfo.path;
    this.buildingLongitude = bdgInfo.longitude;
    this.buildingLatitude = bdgInfo.latitude;
    this.buildingMsg1 = bdgInfo.buildingMsg1;
    // 이후 이 함수는 Bdg 객체로 작동함
}

function bdg(id, name, path, longitude, latitude, msg1) {
    this._id = id;
    this.buildingName = name;
    this.buildingImage = path;
    this.buildingLongitude = longitude;
    this.buildingLatitude = latitude;
    this.buildingMsg1 = msg1;
}