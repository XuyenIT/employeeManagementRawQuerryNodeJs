const mysql = require("mysql2/promise");
const connect = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3307,
  database: "dbemployee",
});

module.exports = connect;
