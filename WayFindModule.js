const astar = require("./astar.js");

function makeGraph(startBdgInfo, endBdgInfo) {
    //시작 건물들, 끝 건물들의 인근 건물 정보들을 불러와서 그래프를 만든다.

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