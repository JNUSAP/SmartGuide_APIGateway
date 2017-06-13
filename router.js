const MessageProvider = require("./MessageProvider.js");
const bodyParser = require('body-parser');
const path = require("path");
const url = require('url');
const DBBdgModule = require("./DBBdgModule.js");
const multer = require('multer');
const Building = require('./building.js');
/*
 * 라우터 모듈
 * 
 * 서버로 들어오는 HTTP 요청들을 활성화하는 루틴이 있다.
 * 특이사항:
 *    testRoutine : 건물 ID로 카카오 요청을 시뮬레이트한다.
 * 
 * TODO : Bdg REST를 담당하는 루틴을 모듈로 분리 
 */
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
        console.log("/keyboard:");
        console.log(req.body);
        res.json({ "type": "text" });
    });
    app.post('/message', function(req, res) {
        console.log("/message:");
        console.log(req.body);
        res.setHeader('Content-Type', 'application/json');
        MessageProvider.getResponse("kakao", req.body, function(result) {
            res.json(result)
        });
    });
}

function addBdgREST(app) {
    app.get('/bdgInfo', function(req, res) {
        var bdgName = req.query.BdgName;
        DBBdgModule.getInfoByNickName(bdgName).then(function(building) {
            var id = building.buildingId;
            res.redirect('/bdg/' + id);
        });
    });
    app.post('/bdg', function(req, res) {
        var bdgInfo = new Building(null, req.body.name, req.file.filename, parseFloat(req.body.longitude), parseFloat(req.body.latitude), "");
        DBBdgModule.setInfo(bdgInfo);
        res.status(204).send();
    });
    app.get('/bdg/:id', function(req, res) {
        var id = req.params.id;
        if (id == -1) res.redirect('/failed');
        DBBdgModule.getInfoById(id).then(function(building) {
            var bdgInfo = building;
            console.log(bdgInfo);
            res.render('bdg', bdgInfo);
        });
    });
    app.get('/bdg/info/:id', function(req, res) {
        var id = req.params.id;
        DBBdgModule.getInfoById(id).then(function(building) {
            if (building.buildingId == -1) res.status(404).send();
            else res.json(building);
        });
    });

}

function addSuggestREST(app) {
    app.get('/suggestBdg/:id', function(req, res) {
        var id = req.params.id;
        DBSuggestModule.getSuggest(id).then(function(suggest) {
            if (suggest.suggestId == -1) res.status(404).send();
            else res.json(suggest);
        });
    });
    app.post('/suggestBdg', function(req, res) {
            var suggest = new BdgSuggest();
            DBSuggestModule.addSuggest(suggest);
            res.status(204).send();
    });
}

function addViews(app) {
    app.set('view engine', 'pug');
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/admin/bdgAdd', function(req, res) {
        res.render('bdgAddPage');
    });
    app.get('/admin', function(req, res) {
        res.render('adminPage');
    });
    app.get('/failed', function(req, res) {
        res.render('failedPage');
    });
    app.get('/admin/suggest', function(req, res) {
        res.render('suggestPage');
    });

    app.get('/search', function(req, res) {
        res.render('searchPage');
    });
    app.get('/admin/bdgInfo', function(req, res) {
        res.render('bdgInfoPage');
    });
}

function addFiles(app) {
    //Whitelist 방식
    //브라우저 Javascripts

    app.get('/views/scripts/suggest.js', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/scripts/suggest.js'));
    });

}