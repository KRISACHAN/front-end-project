const mysql = require('mysql2');
const moment = require('moment');

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

    connection.connect(err => {
        if (err) {
            console.log(err);
            return;
        };

        // const TABLE_NAME = 'personal';

        // const dropTable = `DROP TABLE IF EXISTS ${TABLE_NAME};`;
        // connection.query(dropTable); 

        // const createTable  = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        //         id INT(10) NOT NULL AUTO_INCREMENT,
        //         account VARCHAR(16) DEFAULT NULL,
        //         nickname VARCHAR(10) DEFAULT NULL,
        //         sex TINYINT(1) DEFAULT NULL,
        //         birthday DATE DEFAULT NULL,
        //         description VARCHAR(200) DEFAULT NULL,
        //         is_deleted BOOLEAN DEFAULT NULL,
        //         create_date DATETIME DEFAULT NULL,
        //         update_date DATETIME DEFAULT NULL,
        //         delete_date DATETIME DEFAULT NULL,
        //         PRIMARY KEY (id),
        //         UNIQUE KEY account (account)
        //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;
        // connection.query(createTable);

        // const insertQuery = `INSERT INTO ${TABLE_NAME}(account, nickname, sex, birthday, description, is_deleted, create_date) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        // const insertValues1 = ['krissarea1', 'kris', 0, '1995-02-15', '我是一只鱼头', false, moment(new Date()).format('YYYY-MM-DD HH:mm:ss')];
        // const insertValues2 = ['krissarea2', 'kelly', 1, '1995-02-15', '我是一只kelly', false, moment(new Date()).format('YYYY-MM-DD HH:mm:ss')];
        // const insertValues3 = ['krissarea3', 'alloy', 0, '1995-02-15', '我是一只alloy', false, moment(new Date()).format('YYYY-MM-DD HH:mm:ss')];
        // connection.query(insertQuery, insertValues1);
        // connection.query(insertQuery, insertValues2);
        // connection.query(insertQuery, insertValues3);

        // const searchAllNickname = `SELECT * FROM ${TABLE_NAME} WHERE account LIKE ? ORDER BY id ASC limit ? offset ?`;
        // const params = ['%krissarea%', 10, 0];
        // connection.query(searchAllNickname, params, (err, res, fields) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     };
        //     console.log(res);
        // });

        // const updateStatement = `UPDATE ${TABLE_NAME} SET account = ? WHERE id  = ?`;
        // const params = ['kris2-by-update', 2];
        // connection.query(updateStatement, params, (err, res, fields) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     };
        //     console.log(res);
        // });

        // const deleteStatement = `DELETE FROM ${TABLE_NAME} WHERE account = ?`;
        // const params = ['kris2-by-update'];
        // connection.query(deleteStatement, params, (err, res, fields) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     };
        //     console.log(res);
        // });

        // connection.end();

    });
});
  