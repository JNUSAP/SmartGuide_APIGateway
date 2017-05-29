const MessageProvider = require("./MessageProvider.js");
const bodyParser = require('body-parser');
const path = require("path");
const url = require('url');
const DBBdgModule = require("./DBBdgModule.js");
const multer = require('multer');
const building = require('./building.js');

exports.init = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(multer({ dest: './img' }).single('img'));
    addKakaoResponse(app);
    addViews(app);
    addBdgREST(app);
    addSuggestREST(app);
    addFiles(app);
};

function addKakaoResponse(app) {
    app.get('/keyboard', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "type": "text" }));
    });
    app.post('/message', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(
            JSON.stringify(MessageProvider.getResponse("kakao")) // 임시 메시지. MessageProvider.js로
        );
    });
}

function addBdgREST(app) {
    app.get('/bdgInfo', function(req, res) {
        var bdgName = req.query.bdgName;
        var bdgInfo = DBBdgModule.getInfo(bdgName);
        res.render('bdg', bdgInfo);
    });
    app.post('/bdg', function(req, res) {
        var bdgInfo = new building(null, req.body.name, req.file.path, req.body.longitude, req.body.latitude, "");
        DBBdgModule.setInfo(bdgInfo);
        res.status(204).send(req.body);
    });
    app.get('/bdg/:id', function(req, res) {
        var id = req.params.id;
        var bdgInfo = DBBdgModule.getInfo(id);
        res.render('bdg', bdgInfo);
    });

}

function addSuggestREST(app) {
    app.get('/suggestBdg',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(MessageProvider.getResponse("kakao")) // 임시 메시지. MessageProvider.js로
            );
        });
    app.post('/suggestBdg',
        function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(

            );
        });
}

function addViews(app) {
    app.set('view engine', 'pug');
    app.get('/', function(req, res) {
        res.render('searchPage');
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

    app.get('/search', function(req, res) {
        res.render('searchPage');
    });
}

function addFiles(app) {
    //Whitelist 방식
    //브라우저 Javascripts
    app.get('/views/scripts/suggest.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });
    app.get('/views/scripts/BdgInfo.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });
    app.get('/views/scripts/BdgInfo.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });
}