const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "udemy_delivery",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Database Conected");
});
module.exports = db;
