const express = require('express');
const router = express.Router();
const db = require('../models/database')

router.get("/", (req, res) => {
    let sql = "SELECT eventId,name,takePlace,district,province FROM Event";
    db.query(sql, (err, result) => {
        if (err) throw err;
      console.log(result);
      res.json( result );
    });
});

router.get("/:eventId", (req, res) => {
    var eventId = req.params
    res.json({ message: eventId });
});

module.exports = router;