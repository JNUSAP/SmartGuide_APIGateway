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

function createElement(typeName, className, obj) {
    /* HTML 요소를 만든다. */
    var element = document.createElement(typeName);
    element.className = className;
    obj.append(element);
    return element;
}

function makeBdgInfo(bdgDB) {
    var bdginfo = document.createElement("form");
    bdginfo.className = "w3-container";
    /*이름*/
    createElement("h6", "bdgTitle", bdginfo)
        .innerHTML = bdgDB.buildingName;
    /*GPS */
    var gpsDiv = createElement("div", "centerdiv", bdginfo);
    var lat = createElement("label", "GPSlabel", gpsDiv);
    lat.innerHTML = "Latitude: " + bdgDB.buildingLatitude;
    createElement("br", "", gpsDiv);
    var lng = createElement("label", "GPSlabel", gpsDiv);
    lng.innerHTML = "Longitude: " + bdgDB.buildingLongitude;
    createElement("br", "", bdginfo);
    /*사진 */
    var imgDiv = createElement("div", "centerdiv", bdginfo);
    var img = createElement("img", "", imgDiv);
    img.src = "http://52.78.17.235/img/" + bdgDB.buildingImage;
    img.id = "myImg" + bdgDB.buildingId;
    img.width = 240;
    img.height = 180;
    createElement("br", "", bdginfo);
    /*별명들 */
    createElement("br", "", bdginfo);
    /*버튼 */
    var buttondiv = createElement("div", "centerdiv", bdginfo);
    var modifyButton = createElement("button", "w3-button w3-green", buttondiv)
    modifyButton.innerHTML = "별명 추가";
    modifyButton.onclick = function() {
        var nickname = prompt("별명을 입력하세요", "");
        if (nickname == null || nickname == "") {

        } else {
            AddBdgNickname(bdgDB.buildingId, nickname);
        }
    };
    var deleteButton = createElement("button", "w3-button w3-red", buttondiv)
    deleteButton.innerHTML = "삭제";
    deleteButton.onclick = function() {
        if (confirm("정말로 삭제하시겠습니까?") == true)
            deleteBdgInfo(bdgDB.buildingId, bdginfo)
    };
    return bdginfo;
}

function AppendBdgInfo(id, bdgInfoBoard) {
    getBdgInfo(id, function(bdgDB) {
        /*REST로 건물 정보를 얻은 뒤 호출되는 함수*/
        var bdgInfo = makeBdgInfo(bdgDB);
        bdgInfoBoard.append(bdgInfo);
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

function AddBdgNickname(id, nickname) {
    var req = new XMLHttpRequest();
    var data = new FormData();
    data.append('nickname', nickname);

    req.open('POST', '/bdg/nickname/' + id, true);

    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success.");
            alert("추가되었습니다.");
        } else if (req.readyState == 4 && req.status == 404) {
            console.log("bdg request err.");
            alert("오류가 발생했습니다.");
            return -1;
        }
    }
    req.send(data);

}

function deleteBdgInfo(id, element) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/bdg/info/' + id, true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            alert("삭제되었습니다.");
            return element.parentNode.removeChild(element);
        } else if (req.readyState == 4 && req.status == 404) {
            return alert("삭제 중 오류가 발생했습니다.");
        }
    };
    req.send(null);
}