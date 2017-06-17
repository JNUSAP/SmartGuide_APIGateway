const express = require('express');
const app = express();
const router = require('./router.js');
const fs = require('fs');
const fileName = './config.json';
const http = require('http');
const https = require('https');
const httpPort = 80
const httpsPort = 443;
const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('cert.pem')
};
var file = require(fileName);

/*일부 폴더 정적 공유*/
app.use("/img", express.static(__dirname + '/img')); // Route.addFiles()의 일부
app.use("/thumb", express.static(__dirname + '/thumb')); // Route.addFiles()의 일부
app.use("/views/scripts", express.static(__dirname + '/views/scripts')); // Route.addFiles()의 일부
/*
app.set('ports_https',httpsPort);
app.all('*',function(req,res,next){
if(req.secure){
return next();};
res.redirect('https://'+req.hostname+':'+app.get('port_https')+req.url);
});
*/

router.init(app);
http.createServer(app).listen(httpPort, function() {
    console.log("HTTP Init");
});

https.createServer(options, app).listen(httpsPort, function() {
    console.log("서버 동작 중");
});