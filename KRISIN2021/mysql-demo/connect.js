const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kris',
    password: '12345678',
    database: 'demodb' 
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    };

    console.log('Connected to the MySQL server.');
});

//connection.destroy();
connection.end(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Close the database connection.');
});
  
  