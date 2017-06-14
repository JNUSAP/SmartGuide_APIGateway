const express = require('express');
const app = express();
const router = require('./router.js');
const fs = require('fs');
const fileName = './config.json';
var file = require(fileName);


app.use("/img", express.static(__dirname + '/img')); // Route.addFiles()의 일부

/*ip 설정 최신화*/
require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    fs.writeFileSync(fileName, JSON.stringify({ "host": add }));
}); 

router.init(app);

app.listen(80, function() {
    console.log('서버 동작 중');
});