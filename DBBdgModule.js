const connector = require('./DBConnector.js');
const Building = require('./building.js');
const util = require('util');
var Mock = new Building(0, "공대 7호관", "abcde.jpg", 10.123, 10.234, "");
exports.searchByName = function(keyword) {

}
exports.setNickname = function(id, nickname) {
    var query = util.format("INSERT INTO secondName(secondName, buildingId, refcount) VALUES (\'%s\', %d, 0);", nickname, id);
    return connector.queryAll(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            /*Mysql 모듈의 OKPacket*/
            if (result.affectedRows >= 1) {
                resolve(true);
            }
            reject(false);
        });
    }).catch(function() {
        console.log("deleteInfo failed");
        return false;
    });
}
exports.getIdByNickName = function(nickname) {
    var query = util.format('SELECT * FROM secondName WHERE secondName= \'%s\';', nickname);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined) {
                console.log("getNickname : reject sent");
                reject(new Building(-1));
            }
            /*ID를 쿼리한 뒤 닉네임 획득*/
            /*result = RowDataPacket{nickId, secondName, buildingId} */
            resolve(result.buildingId);
        });
    }).catch(function() {
        console.log("getNickname promised return error");
        return new Building(-1);
    });
}
exports.nicknameRefered = function(nickname) {
    var query = util.format("UPDATE secondName SET refCount = refCount+1 WHERE secondName= \'%s\'", nickname);
    connector.query(query);
};
exports.getInfoByNickName = function(nickname) {
    console.log("getInfoByNick");
    var func = this.getInfoById;
    return this.getIdByNickName(nickname).then(function(id) {
        console.log("getidByNick");
        return func(id);
    });
}
exports.getInfo = function(bdgName) {
    var query = util.format('SELECT * FROM buildingInfo WHERE buildingName = \'%s\';', bdgName);

    return connector.query(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            if (result == undefined || result.buildingIsDeleted == 1) {
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
            if (result == undefined || result.buildingIsDeleted == 1) reject(new Building(-1));

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
            console.log("getId= " + result);
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
    var query = util.format("UPDATE buildingInfo SET buildingIsDeleted = 1 WHERE buildingId = %d;", id);
    return connector.queryAll(query).then(function(result) {
        return new Promise(function(resolve, reject) {
            /*Mysql 모듈의 OKPacket*/
            if (result.affectedRows >= 1) {
                resolve(true);
            }
            reject(false);
        });
    }).catch(function() {
        console.log("deleteInfo failed");
        return false;
    });
};
exports.setInfo = function(bdgInfo) {
    var query = util.format('INSERT INTO buildingInfo(buildingName, buildingImage,buildingLongitude, buildingLatitude, buildingMsg1) VALUES (\'%s\', \'%s\',%d, %d, \'%s\');', bdgInfo.buildingName, bdgInfo.buildingImage, bdgInfo.buildingLongitude, bdgInfo.buildingLatitude, bdgInfo.buildingMsg1);
    connector.query(query);
    /*별명 테이블에 본명 갱신 */
    var setNickname = this.setNickname;
    console.log("set inner Name:");
    this.getId(bdgInfo.buildingName).then(function(result) {
        console.log(result);
        setNickname(result.buildingId, bdgInfo.buildingName);
    });
};
exports.modifyInfo = function(id, bdgInfo) {
    var query = util.format('UPDATE buildingInfo SET buildingName=\'%s\', SET buildingImage=\'%s\', buildingLongitude=%d, buildingLatitude=%d, buildingMsg1=\'%s\' WHERE buildingId = %d;',
        bdgInfo.buildingName, bdgInfo.buildingImage, bdgInfo.buildingLongitude, bdgInfo.buildingLatitude, bdgInfo.buildingMsg1, id);
    connector.query(query);
};
exports.modifyName = function(id, name) {
    var query = util.format("UPDATE buildingInfo SET buildingName=\'%s\ WHERE buildingId = %d;", id);
    connector.query(query);
};
exports.modifyImgPath = function(id, path) {
    var query = util.format("UPDATE buildingInfo SET buildingImage=\'%s\' WHERE buildingId = %d;", id);
    connector.query(query);
};


exports.setNearBdg = function(id, toConnectId) {
    var query = util.format("INSERT INTO nearBdg(buildingId,connectedBdg) VALUES (%d, %d);", id, toConnectId);

    connector.query(query);
}
exports.getNearBdg = function(id) {
    return this.getInfoById(id).then(function(bdgInfo) {
        const diff = 0.0006;
        var lat = bdgInfo.buildingLatitude;
        var lng = bdgInfo.buildingLongitude;
        var query = util.format("SELECT * FROM buildingInfo WHERE ABS(buildingLatitude - %d) < %d AND  ABS(buildingLongitude - %d) < %d;", lat, diff, lng, diff);
        return connector.queryAll(query).then(function(result) {
            return new Promise(function(resolve, reject) {
                if (result == undefined) reject(null);
                var list = {
                    bdglist: []
                };
                for (info in result) {
                    console.log("ifno");
                    console.log(info)
                    console.log(typeof(info))
                    for (elem in info) {
                        console.log("elem");
                        console.log(elem)
                        console.log(typeof(elem))
                    }
                }
                console.log(list);
                if (list.bdglist.length > 0)
                    resolve(list);
                else
                    reject(null);
            });
        }).catch(function() {
            console.log("getNearBdg promised return error");
            return null;
        });
    });
}
exports.getDistance = function(start, end) {
    return new Promise(function(resolve, reject) {
        var query = util.format('SELECT buildingLatitude,buildingLongitude FROM buildingInfo WHERE buildingId = %d;', start);

        connector.query(query).then(function(startGPS) {
            var query = util.format('SELECT buildingLatitude,buildingLongitude FROM buildingInfo WHERE buildingId = %d;', end);
            connector.query(query).then(function(endGPS) {
                var lat = abs(startGPS.buildingLatitude - endGPS.buildingLatitude);
                var lng = abs(startGPS.buildingLongitude - endGPS.buildingLongitude);
                var dist = sqrt(lat ^ 2 + lng ^ 2);
                resolve(dist);
            })
        })
    });
}