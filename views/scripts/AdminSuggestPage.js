var suggestBoard = document.getElementsByName("suggestBoard")[0];
var fill = filler(0);
window.onload = init();
window.addEventListener("scroll", scrollFill);

function scrollFill(ev) {
    if (isBottom()) fill(10);
}

function init() {
    fill(50);
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

function makeSuggestInfo(bdgSuggest) {
    var suggestInfo = document.createElement("div");
    suggestInfo.className = "suggestInfo";

    this.title = createElement("h6", "suggestTitle", suggestInfo);
    this.title.innerHTML = bdgSuggest.suggestTitle;

    this.content = createElement("textarea", "suggestContent", suggestInfo);
    this.content.innerHTML = bdgSuggest.suggestContent;
    this.content.disabled = true;

    createElement("br", "", suggestInfo);

    this.buttondiv = createElement("div", "centerdiv", suggestInfo);

    this.addButton = createElement("button", "w3-button w3-green", this.buttondiv);

    this.addButton.innerHTML = "추가";
    this.addButton.onclick = function() {
        location.href = '/admin/bdgAdd'
    };

    this.deleteButton = createElement("button", "w3-button w3-red", this.buttondiv)
    this.deleteButton.innerHTML = "삭제";
    this.deleteButton.onclick = function() {
        if (confirm("정말로 삭제하시겠습니까?") == true)
            deleteSuggest(bdgSuggest.suggestId, suggestInfo);
    };
    return suggestInfo;
}

function AppendSuggestInfo(id, suggestBoard) {
    getSuggest(id, function(bdgSuggest) {
        var suggestInfo = makeSuggestInfo(bdgSuggest);
        suggestBoard.append(suggestInfo);
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
        } else if (req.readyState == 4 && req.status == 404) {
            console.log("suggest request err.");
            return -1;
        }
    };
}

function deleteSuggest(id, element) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/suggestBdg/' + id);
    req.send(null);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            alert("삭제되었습니다.");
            return element.parentNode.removeChild(element);
        } else if (req.readyState == 4 && req.status == 404) {
            console.log("suggest request err.");
            return alert("삭제 중 오류가 발생했습니다.");
        }
    };
}

function acceptSuggest(id, func) {
    var req = new XMLHttpRequest();
    req.open('POST', '/acceptSuggest/' + id);
}