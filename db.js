const ENV = process.env;
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config('.env');

const MYSQL_HOST = ENV.MYSQL_HOST || "localhost";
const MYSQL_DB = ENV.MYSQL_DB;
const MYSQL_USER = ENV.MYSQL_USER;
const MYSQL_PASSWORD = ENV.MYSQL_PASSWORD;
const MYSQL_USER_TABLE = ENV.MYSQL_USER_TABLE;

// console.log(MYSQL_PASSWORD);

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  database: MYSQL_DB,
  password: MYSQL_PASSWORD
});

connection.connect();
module.exports = connection;