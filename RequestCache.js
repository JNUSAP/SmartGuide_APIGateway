function Cache(){
    const maxCount = 1000;
    var nodeCount = 0;
    var nodes = new Map;
}
function CacheNode(){
    var index= 0,
    var request= '',
    var response= '',
    var recentRef= 0
}
cache.prototype = {
    init:function(){

    },

    saveCache: function (request, response) {
        /*요청 저장 함수*/
        /*AND 연산자 실행순서에 따라 저장된 노드 수가 허용 수를 넘지 않으면
        deleteNode()는 실행되지 않는다. */
        if(this.nodeCount<this.maxCount || this.deleteNode())
            this.nodes.push(new CacheNode(request,response));
        
    },

    getCache: function(response) {
        /* */
        return cache[response];
    }
};

module.exports = Cache;

