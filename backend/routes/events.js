const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db= mysql.createConnection({
  user: "root",
  host: "34.87.51.10",
  password: "admin",
  database: "main",
});

router.get("/", (req, res) => {
  console.log("sending...")
  let sql = 'SELECT eventId, name, takePlace, address, district, province, zipcode, imageURL FROM Event';
  db.query(sql, (err, result) => {
      if (err) throw err;
    console.log(result);
    res.json( result );

  });
});

router.get("/:searchname", (req, res) => {
  console.log("finding...")
  const searchName = req.params.searchname;
  console.log(searchName)
  let sql = `SELECT * FROM Event WHERE name LIKE '%${searchName}%'`;
  db.query(sql, (err, result) => {
      if (err) throw err;
    console.log(result);
    res.json( result );

  });
});

module.exports = router;
