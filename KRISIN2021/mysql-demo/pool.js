const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'kris',
    password: '12345678',
    database: 'demodb',
    waitForConnection: true,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    };

    console.log(pool._freeConnections);
    console.log(connection);
});
  