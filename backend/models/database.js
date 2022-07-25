const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "34.87.51.10",
    password: "admin",
    database: "main",
});

module.exports = db;