const express = require('express');
const app = express();
const router = require('./router.js');
const fs = require('fs');
const fileName = './config.json';
const https = require('https');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

var file = require(fileName);

/*일부 폴더 정적 공유*/
app.use("/img", express.static(__dirname + '/img')); // Route.addFiles()의 일부
app.use("/views/scripts", express.static(__dirname + '/views/scripts')); // Route.addFiles()의 일부

/*ip 설정 최신화*/
require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    fs.writeFileSync(fileName, JSON.stringify({ "host": add }));
});

router.init(app);

https.createServer(options, app).listen(443, function() {
    console.log('서버 동작 중');
});