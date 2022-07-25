const express = require('express');
const router = express.Router();
const db = require('../models/database')
const User = require('../models/user')

router.post("/",(req,res) => {
    const { userId , friendId } = req.body;
    User.find({userId: userId},function (err, result) {
        if (!err) {
            result[0].friends.push(friendId);
            result[0].save();
            res.json({message: "success"});
        }
        else {
            console.log(err);
            res.json({message: "fail"})
        }
    });  
});

module.exports = router;