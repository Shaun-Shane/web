const ENV = process.env;
const sqlite3 = require('sqlite3');
const dotenv = require('dotenv');

dotenv.config('.env');

const MYSQL_USER_TABLE = ENV.MYSQL_USER_TABLE;

const db = new sqlite3.Database('database.sqlite3', (err) => {
    if (err) {
        console.log("Erro opening database " + err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS ${MYSQL_USER_TABLE} (
        id varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        registered datetime CURRENT_TIMESTAMP,
        last_login datetime CURRENT_TIMESTAMP,
        PRIMARY KEY (id))`, (err) => {
            if (err) console.log(err);
        });
    }
})


module.exports = db;