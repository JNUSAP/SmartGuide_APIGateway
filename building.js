function Building(id, name, path, longitude, latitude, msg1) {
    this._id = id;
    this.buildingName = name;
    this.buildingImage = path;
    this.buildingLongitude = longitude;
    this.buildingLatitude = latitude;
    this.buildingMsg1 = "tempmessage";
}

module.exports = Building;
