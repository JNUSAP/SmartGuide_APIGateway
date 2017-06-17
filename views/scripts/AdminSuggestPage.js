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

function createElement(typeName, className, obj, event) {
    var element = document.createElement(typeName);
    element.className = className;
    if (event != undefined)
        element.onclick = event;
    console.log(element);
    obj.append(element);
    return element;
}

function SuggestInfo(bdgSuggest) {
    var suggestInfo = document.createElement("div");
    suggestInfo.className = "suggestInfo";

    this.title = createElement("h6", "suggestTitle", suggestInfo);
    title.innerHTML = bdgSuggest.suggestTitle;

    this.content = createElement("textarea", "suggestContent", suggestInfo);
    content.innerHTML = bdgSuggest.suggestContent;
    content.disabled = true;

    createElement("br", "", suggestInfo);

    this.buttondiv = createElement("div", "centerdiv", suggestInfo);
    this.addButton = createElement("button", "w3-button w3-green", buttondiv);
    AddButton.innerHTML = "추가";
    AddButton.onclick = alert("help!");
    this.deleteButton = createElement("button", "w3-button w3-red", buttondiv)
    deleteButton.innerHTML = "삭제";
    deleteButton.onclick = deleteSuggest(bdgSuggest.suggestId);
}

function AppendSuggestInfo(id, suggestBoard) {
    getSuggest(id, function(bdgSuggest) {
        var suggestInfo = new SuggestInfo(bdgSuggest);
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

function deleteSuggest(id) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/suggestBdg/' + id);
    req.send(null);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            alert("삭제되었습니다.");
            return 1;
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