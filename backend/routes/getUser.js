const express = require('express');
const router = express.Router();
const db = require('../models/database')

router.get("/",(req,res) => {
    const { userId } = req.body;
    var sql = `SELECT * FROM User WHERE userId = '${userId}'`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result[0])
    });
});

module.exports = router;