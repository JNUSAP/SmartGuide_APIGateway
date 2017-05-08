var DBModule = require('./db.js');
var map = requre('./map.js');

var buildingname = DBModule.getBuildingInfo();
var map = draw(BuildingInfo.getid());

var nearBuilding = // 인근 건물 정보 or 단면도