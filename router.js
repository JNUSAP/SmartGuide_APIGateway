const MessageProvider = require("./MessageProvider.js");
const bodyParser = require('body-parser');
const path = require("path");
const url = require('url');
const DBBdgModule = require("./DBBdgModule.js");
const DBSuggestModule = require("./DBSuggestModule.js");
const multer = require('multer');
const Building = require('./building.js');
const BdgSuggest = require('./bdgSuggest.js');
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
    /*모듈들을 초기화하고 HTTP 요청을 등록함*/
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

function addtestRoutine(app) { /*카카오 요청을 모방하는 요청 */
    app.get('/db/:id', function(req, res) {
        var id = req.params.id;
        MessageProvider.getResponse("kakao", { "type": "text", "content": id }, function(result) {
            res.json(result)
        });
    });
}

function addKakaoResponse(app) {
    /*카카오 요청/응답 */
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
    /*(검색 페이지) 건물 검색 시 리다이렉트 */
    app.get('/bdgInfo', function(req, res) {
        var bdgName = req.query.BdgName;
        DBBdgModule.getInfoByNickName(bdgName).then(function(building) {
            var id = building.buildingId;
            res.redirect('/bdg/' + id);
        });
    });
    /*건물 상세 정보 페이지*/

    app.get('/bdg/:id', function(req, res) {
        var id = req.params.id;
        if (id == -1) res.redirect('/failed');
        DBBdgModule.getInfoById(id).then(function(building) {
            var bdgInfo = building;
            console.log(bdgInfo);
            res.render('bdg', bdgInfo);
        });
    });

    app.post('/bdg', function(req, res) {
        /*null과 undefined가 다른 것에 주의 */
        var bdgInfo = new Building(null, req.body.name, req.file.filename, parseFloat(req.body.longitude), parseFloat(req.body.latitude), "");
        console.log("get:");
        console.log(req.body.name);
        console.log(req.file.filename);
        console.log(bdgInfo);
        console.log("set Name:");
        DBBdgModule.setInfo(bdgInfo);
        console.log("set Nickname:");
        DBBdgModule.getId(req.body.name).then(function(id) {
            DBBdgModule.setNickname(id, req.body.nickname);
        });
        res.status(204).send();
    });

    /*JSON 형식 건물 정보 */
    app.get('/bdg/info/:id', function(req, res) {
        var id = req.params.id;
        DBBdgModule.getInfoById(id).then(function(building) {
            if (building.buildingId == -1) res.status(404).send();
            else res.json(building);
        });
    });

}

function addSuggestREST(app) {
    /*건물 제안 정보 */
    app.get('/suggestBdg/:id', function(req, res) {
        var id = req.params.id;
        DBSuggestModule.getSuggest(id).then(function(suggest) {
            if (suggest.suggestId == -1) res.status(404).send();
            else res.json(suggest);
        });
    });
    app.post('/suggestBdg', function(req, res) {
        /*null과 undefined가 다른 것에 주의 */
        console.log(req.body.suggestTitle);
        console.log(req.body.suggestContent);
        var suggest = new BdgSuggest(null, req.body.suggestTitle, req.body.suggestContent);
        /* */
        if (suggest == undefined)
            res.status(500).send();
        else {
            DBSuggestModule.addSuggest(suggest);
            res.status(204).send();
        }
    });
}

function addViews(app) {
    /*페이지 뷰 */
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
    /*서버 내 파일 요청 */

    //Whitelist 방식
    //브라우저 Javascripts
}