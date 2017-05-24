const DB = require("./DBBdgModule.js");

function bdg(id) {
    return bdg(DB.getBdgInfo(id));
}

function bdg(bdgInfo) {
    this._id = bdgInfo.id;
    this._name = bdgInfo.name;
    this._nearBdg = bdgInfo.nearBdgList;
    this._GPS = bdgInfo.GPS;
    this._imgPath = bdgInfo.imgPath;
}