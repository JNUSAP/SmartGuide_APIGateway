const config = require('./config.json');

function Building(id, name, path, longitude, latitude, msg1) {
    if (id === undefined) return new FailedBuilding();
    if (id < -1) return new Path(id, name, longitude, latitude);
    this.buildingId = id;
    this.buildingName = name;
    this.buildingImage = path;
    this.buildingLongitude = longitude;
    this.buildingLatitude = latitude;
    this.buildingMsg1 = "tempmessage";
}

function FailedBuilding() {
    this.buildingId = -1;
}

function Path(id, name, longitude, latitude) {
    this.buildingId = id;
    this.buildingName = name;
    this.buildingLongitude = longitude;
    this.buildingLatitude = latitude;
}

module.exports = Building;