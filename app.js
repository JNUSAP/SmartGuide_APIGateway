const express = require('express');
const app = express();
const router = require('./router.js');
const fs = require('fs');
const fileName = './config.json';
var file = require(fileName);


app.use("/img", express.static(__dirname + '/img')); // Route.addFiles()의 일부

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    fs.writeFileSync(fileName, JSON.stringify({ "host": add }));
}); //ip 설정 최신화

router.init(app); // 라우터 켜기, http 입력받을 준비 완료

app.listen(80, function() {
    console.log('서버 동작 중');
});