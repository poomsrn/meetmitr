const express = require('express');
const router = express.Router();
const db = require('../models/database')
//to do : send -> name, hostUserId, description, location(address, district, province, zipcode)
//                createTimestamp 

router.get("/:eventId", (req, res) => {
    var eventId = req.params;
    let sql = `SELECT * FROM Event WHERE eventId = '${eventId.eventId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
      console.log(result);
      res.json( result );
    });
});

router.post("/",(req,res) => {
    const {userId, eventId} = req.body;
    var sql1 = `SELECT userId, eventId, status FROM UserJoinEvent WHERE userId = '${userId}' && eventId = '${eventId}'` ;
    db.query(sql1, function (err, result) {
        if (result[0] == null) {
            var sql2 = `INSERT INTO UserJoinEvent (userId, eventId, status) VALUES ('${userId}', '${eventId}', 1)`;
            db.query(sql2, function (err) {
                if (err) throw err;
                console.log("join event success")
                res.json("join event success")
            });
        } else {
            if(result[0].status == 0){
                var sql3 = `UPDATE UserJoinEvent SET status='1' WHERE userId = '${userId}' && eventId = '${eventId}'`;
            }else{
                var sql3 = `UPDATE UserJoinEvent SET status='0' WHERE userId = '${userId}' && eventId = '${eventId}'`;
            }
            db.query(sql3, function (err) {
                if (err) throw err;
                console.log("update status success")
                res.json("update status success")
            });
        }
    });
});
module.exports = router;