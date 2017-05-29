var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbteam',
    password: 'dbteam',
    port: 3306,
    database: 'mainBuilding'
});

connection.connect();

exports.query = function(query) {
    return connection.query(query, function(err, rows, fields) {
        if (err)
            console.log("err occurred :" + err.message);
        else
            return [rows, fields];
    });
};