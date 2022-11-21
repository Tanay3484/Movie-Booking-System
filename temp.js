const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Gola2002@#!',
    database : 'movie_db'
});

connection.connect();

connection.query('SELECT Username FROM Customer AS users', function (error, results, fields) {
     if (error) throw error;
     console.log(results);
   });
   
connection.end();