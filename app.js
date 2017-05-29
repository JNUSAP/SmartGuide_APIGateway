const express = require('express');
const app = express();

var router = require('./router.js');

router.init(app); // 라우터 켜기, http 입력받을 준비 완료

app.listen(80, function() {
    console.log('서버 동작 중');
});