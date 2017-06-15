var bdgInfoBoard = document.getElementsByName("bdgInfoBoard")[0];
var fill = filler(0);
window.onload = init();
window.addEventListener("scroll", scrollFill);

function scrollFill(ev) {
    if (isBottom()) fill(10);
}

function init() {
    fill(30);
}

function isBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function AppendBdgInfo(id, bdgInfoBoard) {
    var bdginfo = document.createElement("form");
    bdginfo.className = "w3-container";
    getBdgInfo(id, function(bdgDB) {
        /*REST로 건물 정보를 얻은 뒤 호출되는 함수*/

        createElement = function(typeName, className, obj) {
                /* HTML 요소를 만든다. */
                var element = document.createElement(typeName);
                element.className = className;
                obj.append(element);
                return element;
            }
            /*이름*/
        createElement("h6", "bdgTitle", bdginfo)
            .innerHTML = bdgDB.buildingName;
        /*GPS */
        var gpsDiv = createElement("div", "centerdiv", bdginfo);
        var lat = createElement("label", "GPSlabel", gpsDiv);
        lat.innerHTML = bdgDB.buildingLatitude;
        var lng = createElement("label", "GPSlabel", gpsDiv);
        lng.innerHTML = bdgDB.buildingLongitude;
        createElement("br", "", bdginfo);
        /*사진 */
        var imgDiv = createElement("div", "centerdiv", bdginfo);
        var img = createElement("img", "", imgDiv);
        img.src = "http://52.78.17.235/img/" + bdgDB.buildingImage;
        img.id = "myImg" + bdgDB.buildingId;
        img.width = "120px";
        img.height = "90px";
        createElement("br", "", bdginfo);
        /*별명들 */
        createElement("br", "", bdginfo);
        /*버튼 */
        var buttondiv = createElement("div", "centerdiv", bdginfo);
        createElement("button", "w3-button w3-green", buttondiv)
            .innerHTML = "수정";
        createElement("button", "w3-button w3-red", buttondiv)
            .innerHTML = "삭제";
        return bdgInfoBoard.append(bdginfo);
    });
}

function filler(id) {
    return function(count) {
        for (count; count > 0; count--) {
            AppendBdgInfo(id, bdgInfoBoard);
            id++;
        }
    }
}
//BdgInfo.js
function getBdgInfo(id, func) {
    var req = new XMLHttpRequest();
    req.open('GET', '/bdg/info/' + id, true);
    req.onload = function(e) {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success.");
            console.log(req.responseText);
            info = JSON.parse(req.responseText);
            return func(info);
        }
    };
    req.onerror = function(e) {
        console.log("bdg request err.");
        return -1;
    }
    req.send(null);
}