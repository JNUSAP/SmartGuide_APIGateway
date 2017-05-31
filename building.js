const config = require('./config.json');

function Building(id, name, path, longitude, latitude, msg1) {
    this.buildingId = id;
    this.buildingName = name;
    this.buildingImage = config.host + "/img/" + path;
    this.buildingLongitude = longitude;
    this.buildingLatitude = latitude;
    this.buildingMsg1 = "tempmessage";
}

module.exports = Building;