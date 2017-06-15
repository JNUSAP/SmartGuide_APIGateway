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
        var lat = createElement("label", "", gpsDiv);
        lat.value = bdgDB.buildingLatitude;
        var lng = createElement("label", "", gpsDiv);
        lng.value = bdgDB.buildingLongitude;
        createElement("br", "", bdginfo);
        /*사진 */
        var imgDiv = createElement("div", "centerdiv", bdginfo);
        var img = createElement("img", "", imgdiv);
        img.src = "http://52.78.17.235/img/" + bdgDB.buildingImg;
        img.id = "myImg" + bdgDB.buildingId;
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
        var modal = creatElement("div", "modal", imgdiv);
        modal.id = "myModal" + bdgDB.buildingId;
        var closeButton = createElement("span", "close", imgdiv);
        closeButton.onclick = "document.getElementById('myModal" + bdgDB.buildingId + "').style.display='none'";
        closeButton.innerHTML = "&times;"
        var span = close[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
        var modalImage = createElement("img", "modal-content", imgdiv);
        modalImage.id = "img" + bdgDB.buildingId;

        createElement("br", "", bdginfo);
        /*별명들 */
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