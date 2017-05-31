var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'ec2-52-78-17-235.ap-northeast-2.compute.amazonaws.com',
    user: 'dbteam',
    password: 'dbteam',
    port: 3306,
    database: 'mainBuilding',
});
connection.connect();


exports.query = function(query) {
    return new Promise(function(resolve, reject) {
        connection.query(query, function(err, result) {
            if (err) {
                console.log(query);
                console.log("err occurred :" + err.message);
                reject(err);
            } else {
                console.log(query);
                console.log("result :");
                console.log(result[0]);
                resolve(result[0]);
            }
        });
    }).catch(function() {
        console.log("DBConnecor Promise returned Error");
    });
};