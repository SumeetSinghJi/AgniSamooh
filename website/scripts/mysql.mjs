import mysql from 'mysql';

/* MYSQL DB Info

Database digital location: cd C:\tools\mysql\mysql-8.0.31-winx64\bin
login command: mysql -u root -p
vscode/node.js user account;
    username: user
    password: password

Database name: agnisamooh_database
table names: users

*/

var con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'agnisamooh_database'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});