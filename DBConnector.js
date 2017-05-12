var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: '< MySQL username >',
    password: '< MySQL password >',
    port: 3306,
    database: 'my_db'
});

connection.connect();

exports.query = function(query) {
    return connection.query(query, function(err, rows, fields) {
        return [rows, fields];
    });
};