exports.init = function(app) {
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
            res.send(JSON.stringify({
                    "message": {
                        "text": "테스트 중입니다.",
                        "photo": {
                            "url": "",
                            "width": "",
                            "height": ""
                        },
                        "message_button": {

                        }
                    }
                } // 임시 메시지. MessageProvider.js로
            ));
        });
    app.get('/keyboard',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "type": "text" }));
        });


};