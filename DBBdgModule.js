var Mock = {
    "id": 0,
    "name": "공대 7호관",
    "GPS": {
        "latitude": 10.123,
        "longitude": 10.234
    },
    "imgPath": "./abcde.jpg"
};
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
    console.log(bdgInfo);
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