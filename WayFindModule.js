const astar = require("./astar.js");

function makeGraph(startBdgInfo, endBdgInfo) {
    //시작 건물들, 끝 건물들의 인근 건물 정보들을 불러와서 가중치 인접 행렬을 만든다.
    var startId = startBdgInfo.buildingId;
    var endId = startBdgInfo.buildingId;
    var queue = [];
    var currentBdgInfo;
    var maxCount = 16;
    var currentCount = 0;
    while (queue[0] != endId && curretCount < maxCount) {
        var info = DBBdgModule.getNearBdg(currentId);
        for (nearBdgId in list) {
            queue.push(narBdgId);
        }
        queue.shift();
        currentCount++;
    }
    var graphCol = [];
    graphCol.push([]);
    for (row in graphCol) {
        row.append[];
    }
}

function extendArray(oldgraph, bdgId) {
    oldgraph.push();
    for (col in oldgraph) {
        col.push();
    }
}
exports.wayFind = function(startBdgInfo, endBdgInfo) {
    //Sample Code : https://github.com/bgrins/javascript-astar
    var graphWithWeight = new Graph([
        [1, 1, 2, 30],
        [0, 4, 1.3, 0],
        [0, 0, 5, 1]
    ]);
    var startWithWeight = graphWithWeight.grid[0][0];
    var endWithWeight = graphWithWeight.grid[1][2];
    var resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight);
    // resultWithWeight is an array containing the shortest path taking into account the weight of a node
}