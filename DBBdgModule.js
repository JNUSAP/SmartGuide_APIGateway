const connector = require('./DBConnector.js');
const Building = require('./building.js');
const util = require('util');
var Mock = new Building(0, "공대 7호관", "abcde.jpg", 10.123, 10.234, "");

exports.getInfo = function(bdgName) {
    var query = util.format('SELECT * FROM buildingInfo WHERE buildingName = \'%s\';', bdgName);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) {
                console.log("getInfo : reject sent");
                reject(new Building(-1));
            }

            var building = new Building(result.buildingId, result.buildingName, result.buildingImage, result.buildingLongitude, result.buildingLatitude, result.buildingMsg1);
            console.log("building:");
            console.log(building);
            resolve(building);
        });
    }).catch(function() {
        console.log("getInfo promised return error");
        return new Building(-1);
    });
};
exports.getInfoById = function(bdgId) {
    var query = util.format('SELECT * FROM buildingInfo WHERE buildingId = %d;', bdgId);
    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) reject(new Building(-1));

            var building = new Building(result.buildingId, result.buildingName, result.buildingImage, result.buildingLongitude, result.buildingLatitude, result.buildingMsg1);
            console.log(building);
            resolve(building);
        });
    }).catch(function() {
        console.log("getInfoById promised return error");
        return new Building(-1);
    });
}
exports.getId = function(bdgName) {
    var query = util.format('SELECT buildingId FROM buildingInfo WHERE buildingName = \'%s\';', bdgName);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) reject(-1);
            console.log(getId + " = " + result);
            resolve(result);
        });
    });
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

exports.deleteInfo = function(id) {
    var query = util.format("UPDATE buildingInfo SET buildingIsDeleted = TRUE, WHERE buildingId = %d;", id);
    connector.query(query);
};
exports.setInfo = function(bdgInfo) {
    var query = util.format('INSERT INTO buildingInfo(buildingName, buildingImage,buildingLongitude, buildingLatitude, buildingMsg1) VALUES (\'%s\', \'%s\',%d, %d, \'%s\');', bdgInfo.buildingName, bdgInfo.buildingImage, bdgInfo.buildingLongitude, bdgInfo.buildingLatitude, bdgInfo.buildingMsg1);
    connector.query(query);
    /*별명 테이블에 본명 갱신 */
    setNickName(getId(bdgInfo.buildingName), bdgInfo.buildingName);
};
exports.modifyInfo = function(id, bdgInfo) {
    var query = util.format('UPDATE buildingInfo SET buildingName=\'%s\', SET buildingImage=\'%s\', buildingLongitude=%d, buildingLatitude=%d, buildingMsg1=\'%s\', WHERE buildingId = %d;',
        bdgInfo.buildingName, bdgInfo.buildingImage, bdgInfo.buildingLongitude, bdgInfo.buildingLatitude, bdgInfo.buildingMsg1, id);
    connector.query(query);
};
exports.modifyName = function(id, name) {
    var query = util.format("UPDATE buildingInfo SET buildingName=\'%s\, WHERE buildingId = %d;", id);
    connector.query(query);
};
exports.modifyImgPath = function(id, path) {
    var query = util.format("UPDATE buildingInfo SET buildingImage=\'%s\', WHERE buildingId = %d;", id);
    connector.query(query);
};


exports.setNickname = function(id, nickname) {
    var query = util.format("INSERT INRO secondName(secondname, buildingId) VALUES (\'%s\', %d);", nickname, id);
    connector.query(query);
}
exports.getInfoByNickName = function(nickname) {
    var query = util.format('SELECT * FROM secondName WHERE secondName= \'%s\';', nickname);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) {
                console.log("getNickname : reject sent");
                reject(new Building(-1));
            }
            /*ID를 쿼리한 뒤 닉네임 획득*/
            var building = getInfoById(result.buildingId);
            resolve(building);
        });
    }).catch(function() {
        console.log("getNickname promised return error");
        return new Building(-1);
    });
};

exports.setNearBdg = function(id, toConnectId) {
    var query = util.format("INSERT INRO nearBdg(buildingId,connectedBdg) VALUES (%d, %d);", id, toConnectId);

    connector.query(query);
}
exports.getNearBdg = function(id) {
    var query = util.format('SELECT * FROM nearBdg WHERE buildingId = %d;', id);

    return connector.queryAll(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) {
                console.log("getNearBdg : reject sent");
                reject(new Building(-1));
            }

            var nearId = new Array();
            for (row in result) {
                nearId.push(row[connectedBdg]);
            }
            resolve(nearId);
        });
    }).catch(function() {
        console.log("getNearBdg promised return error");
        return new Building(-1);
    });
};