const express = require('express');
const router = express.Router();
const db = require('../models/database')

router.post("/",(req,res) => {
    const {userId} = req.body;
    console.log(userId)
    var sql = `DELETE FROM User WHERE userId = '${userId}'`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("success")
        res.json({message: "success"})
    });
});

module.exports = router;