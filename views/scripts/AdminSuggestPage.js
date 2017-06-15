var suggestBoard = document.getElementsByName("suggestBoard")[0];
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

function AppendSuggestInfo(id, suggestBoard) {
    var suggestInfo = document.createElement("div");
    suggestInfo.className = "suggestInfo";
    getSuggest(id, function(bdgSuggest) {
        createElement = function(typeName, className, obj, event) {
            var element = document.createElement(typeName);
            element.className = className;
            if (event != undefined)
                element.onclick = event;
            console.log(element);
            obj.append(element);
            return element;
        }

        createElement("h6", "suggestTitle", suggestInfo)
            .innerHTML = bdgSuggest.suggestTitle;
        var content = createElement("textarea", "suggestContent", suggestInfo)
        content.innerHTML = bdgSuggest.suggestContent;
        content.disabled = true;
        createElement("br", "", suggestInfo);
        var buttondiv = createElement("div", "centerdiv", suggestInfo);
        createElement("button", "w3-button w3-green", buttondiv)
            .innerHTML = "추가";
        createElement("button", "w3-button w3-red", buttondiv)
            .innerHTML = "삭제";
        return suggestBoard.append(suggestInfo);
    });
}

function filler(id) {
    return function(count) {
        for (count; count > 0; count--) {
            AppendSuggestInfo(id, suggestBoard);
            id++;
        }
    }
}
//suggestInfo.js
function getSuggest(id, func) {
    var req = new XMLHttpRequest();
    req.open('GET', '/suggestBdg/' + id);
    req.send(null);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success.");
            console.log(req.responseText);
            info = JSON.parse(req.responseText);
            return func(info);
        } else {
            console.log("suggest request err.");
            return -1;
        }
    };
}

function deleteSuggest(id, func) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/suggestBdg/' + id);
    req.send(null);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            console.log("success.");
            console.log(req.responseText);
            info = JSON.parse(req.responseText);
            return func(info);
        } else {
            console.log("suggest request err.");
            return -1;
        }
    };
}

function acceptSuggest(id, func) {
    var req = new XMLHttpRequest();
    req.open('POST', '/acceptSuggest/' + id);
}