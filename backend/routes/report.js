const express = require('express');

const router = express.Router();
const { uuid } = require('uuidv4');
const db = require('../models/database')

router.post("/",(req,res) => {
    const { reason, reportedUserId, userId } = req.body;
    var sql = `INSERT INTO Report (reportId, reason, reportedUserId, userId) VALUES ('${uuid()}', '${reason}', '${reportedUserId}', '${userId}' )`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("report success")
        res.json({message: "success"})
    });
});

module.exports = router;