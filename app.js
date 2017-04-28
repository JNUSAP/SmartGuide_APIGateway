const express = require('express');
const app = express();

var router = require('./router.js');

router.init(app); // 라우터 켜기, http 입력받을 준비 완료

app.listen(4127, function() {
    console.log('플래그 전송 서버 준비 완료');
});


//test 제공
module.exports = app;