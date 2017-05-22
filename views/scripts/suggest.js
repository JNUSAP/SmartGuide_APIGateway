var suggestBoard = document.getElementsByName("suggestBoard")[0];
var fill = filler(0);
window.onload = init();
window.addEventListener("scroll", scrollFill);

function scrollFill(ev) {
    if (isBottom()) fill(10);
}

function init() {
    fill(10);
}

function isBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function AppendBdgInfo(id, suggestBoard) {
    var bdginfo = document.createElement("div");
    bdginfo.className = "suggestInfo";
    getBdgInfo(id, function(bdgInfo) {
        createElement = function(typeName, className, obj) {
            var element = document.createElement(typeName);
            element.className = className;
            obj.append(element);
            return element;
        }

        createElement("p", "suggestTitle", bdginfo)
            .innerHTML = "Title";
        var content = createElement("textarea", "suggestContent", bdginfo)
        content.innerHTML = id;
        content.disabled = true;
        createElement("br", "", bdginfo);
        createElement("button", "acceptButton", bdginfo)
            .innerHTML = "추가";
        createElement("button", "deleteButton", bdginfo)
            .innerHTML = "삭제";
        return suggestBoard.append(bdginfo);
    });
}

function filler(id) {
    return function(count) {
        for (count; count > 0; count--) {
            AppendBdgInfo(id, suggestBoard);
            id++;
        }
    }
}
//BdgInfo.js
function getBdgInfo(id, func) {
    var req = new XMLHttpRequest();
    req.open('GET', '/bdg/' + id);
    req.send(null);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success.");
            console.log(req.responseText);
            info = req.responseText;
            return func(info);
        } else {
            console.log("bdg request err.");
            return -1;
        }
    };
}