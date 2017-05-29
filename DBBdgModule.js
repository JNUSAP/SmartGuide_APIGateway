const connector = require('./DBConnector.js');
const building = require('./building.js');
const util = require('util');
var Mock = building(0, "공대 7호관", "abcde.jpg", 10.123, 10.234, "");

exports.getInfo = function(bdgName) {
    return Mock;
};
exports.getId = function(bdgName) {
    return Mock.id;
};
exports.getName = function(id) {
    return Mock.name;
};
exports.getImgPath = function(id) {
    return Mock.imgPath;
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
    console.log(query);
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
