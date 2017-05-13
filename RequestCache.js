var cache = {
    index: 0,
    request: '',
    response: ''
}

function saveCache(request, response) {
    cache[request] = response;
}

function getCache(response) {
    return cache[response];
}