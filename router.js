var MessageProvider = require("./MessageProvider.js");
var ImgProvider = require("")
var bodyParser = require('body-parser');
exports.init = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(flag['xormagic']));
        });
    app.get('/keyboard',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "type": "text" }));
        });
    app.post('/message',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(MessageProvider.getResponse("kakao")) // 임시 메시지. MessageProvider.js로
            );
        });
    app.get('/suggest',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(MessageProvider.getResponse("kakao")) // 임시 메시지. MessageProvider.js로
            );
        });
    app.post('/suggest/bdg',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(

            );
        });
    /*    app.get('/keyboard',
            function(req, res) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ "type": "text" }));
                
            });
            */
};