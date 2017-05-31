const connector = require('./DBConnector.js');
const Building = require('./building.js');
const util = require('util');
var Mock = new Building(0, "공대 7호관", "abcde.jpg", 10.123, 10.234, "");
exports.getInfoByNickName = function(bdgName) {
    return this.getInfo(bdgName);
}

exports.getInfo = function(bdgName, callback) {
    if (typeof(bdgName) == 'number') // bdgId check
        var query = util.format('SELECT * FROM buildingInfo WHERE buildingName = \'%s\';', bdgName);
    else
        var query = util.format('SELECT * FROM buildingInfo WHERE buildingId = %d;', bdgName);

    var result = connector.query(query);
    var building = new Building(result.buildingId, result.buildingName, result.buildingImage, result.buildingLongitude, result.buildingLatitude, result.buildingMsg1);
    return building;
};
exports.getId = function(bdgName) {
    var query = util.format('SELECT buildingId FROM buildingInfo WHERE buildingName = \'%s\';', bdgName);
    var result = connector.query(query);
    if (typeof(result) === Number) return result;
    else return -1;
};
exports.getOriginName = function(id) {
    var query = util.format('SELECT buildingName FROM buildingInfo WHERE buildingId = \'%d\';', id);
    var result = connector.query(query);
    console.log(result);
    return result[0];
};
exports.getImgPath = function(id) {
    var query = util.format('SELECT buildingImage FROM buildingInfo WHERE buildingId = \'%d\';', id);
    var result = connector.query(query);
    console.log(result);
    return result[0];
};
exports.getNearBdgList = function(BdgId) {
    return [Mock, Mock, Mock];
}
exports.getWayfindData = function(start, end) {
    return [Mock, Mock, Mock];
};

exports.setInfo = function(bdgInfo) {
    var query = util.format('INSERT INTO buildingInfo(buildingName, buildingImage,buildingLongitude, buildingLatitude, buildingMsg1) VALUES (\'%s\', \'%s\',%d, %d, \'%s\');', bdgInfo.buildingName, bdgInfo.buildingImage, bdgInfo.buildingLongitude, bdgInfo.buildingLatitude, bdgInfo.buildingMsg1);
    connector.query(query);
};
exports.setName = function(id, name) {
    console.log(id);
    console.log(name);
};
exports.setImgPath = function(id, path) {
    console.log(id);
    console.log(path);
};
exports.setNearBdgList = function(id) {
    console.log(id);
};
