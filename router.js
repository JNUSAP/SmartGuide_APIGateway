const MessageProvider = require("./MessageProvider.js");
const bodyParser = require('body-parser');
const path = require("path");
exports.init = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    addViews(app);
    addBdgREST(app);
    addSuggestREST(app);
};

function addKakaoResponse(app) {
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
}

function addBdgREST(app) {

}

function addSuggestREST(app) {
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
}

function addViews(app) {
    app.set('view engine', 'pug');
    app.get('/',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(flag['xormagic']));
        });
    app.get('/bdgAdd', function(req, res) {
        res.render('bdgAddPage');
    });
    app.get('/admin', function(req, res) {
        res.render('adminPage');
    });
    app.get('/failed', function(req, res) {
        res.render('failedPage');
    });
    app.get('/suggest', function(req, res) {
        res.render('suggestPage');
    });
    app.get('/views/scripts/suggest.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });
    app.get('/views/scripts/BdgInfo.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });
    app.get('/search', function(req, res) {
        res.render('searchPage');
    });
}