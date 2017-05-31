const MessageProvider = require("./MessageProvider.js");
const bodyParser = require('body-parser');
const path = require("path");
const url = require('url');
const DBBdgModule = require("./DBBdgModule.js");
const multer = require('multer');
const Building = require('./building.js');
exports.init = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(multer({ dest: './img' }).single('img'));
    addtestRoutine(app);
    addKakaoResponse(app);
    addViews(app);
    addBdgREST(app);
    addSuggestREST(app);
    addFiles(app);
};

function addtestRoutine(app) {
    app.get('/db/:id', function(req, res) {
        var id = req.params.id;
        MessageProvider.getResponse("kakao", { "type": "text", "content": id }, function(result) {
            res.json(result)
        });
    });
}

function addKakaoResponse(app) {
    app.get('/keyboard', function(req, res) {
        console.log("/keyboard:" + req);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "type": "text" }));
    });
    app.post('/message', function(req, res) {
        console.log("/message:" + req);
        res.setHeader('Content-Type', 'application/json');
        res.send(
            JSON.stringify(MessageProvider.getResponse("kakao", req.body))
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
        var bdgInfo = new Building(null, req.body.name, req.file.filename, parseFloat(req.body.longitude), parseFloat(req.body.latitude), "");
        DBBdgModule.setInfo(bdgInfo);
        res.status(204).send();
    });
    app.get('/bdg/:id', function(req, res) {
        var id = req.params.id;
        DBBdgModule.getInfo(id, function(building) {
            var bdgInfo = building;
            console.log(bdgInfo);
            res.render('bdg', bdgInfo);
        });
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

}