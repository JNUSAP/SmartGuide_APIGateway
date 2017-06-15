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

        createElement("p", "bdgTitle", bdginfo)
            .innerHTML = bdgDB.buildingName;
        var content = createElement("textarea", "bdgContent", bdginfo)
        content.innerHTML = "GPS:" + bdgDB.buildingLongitude + "," + bdgDB.buildingLatitude;
        content.disabled = true;
        createElement("br", "", bdginfo);
        createElement("button", "acceptButton", bdginfo)
            .innerHTML = "추가";
        createElement("button", "deleteButton", bdginfo)
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