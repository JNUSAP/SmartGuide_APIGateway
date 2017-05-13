function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function setSuggestList(responseText) {
    var suggestList = JSON.parse(responseText);
}

function loadSuggestList() {
    httpGetAsync("./suggestLists", setSuggestList);
}