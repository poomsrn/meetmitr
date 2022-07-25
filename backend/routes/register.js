const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const db = require('../models/database')
const User = require('../models/user')

router.post("/",(req,res) => {
    const {firstName, lastName, password, email, birthdate, gender} = req.body;
    const password_hash = bcrypt.hashSync(password, 10);
    const id = uuid()
    const user = new User({
        userId: id,
        email: req.body.email,
        gender: req.body.gender,
        profileName: '',
        birthdate: req.body.birthdate,
        displayPicURL: [],
        password: password_hash,
        firstName: req.body.firstName,
        middleName: '',
        lastName: req.body.lastName,
        hideGender: false,
        numberOfPenalty: 0,
        bio: '',
        phoneNo: '',
        friends: [],
        personalities: []
    })
    user.save((err) => {
        if (err) return console.log(err);
    });
    var sql = `INSERT INTO User (userId, email, gender, profileName, phoneNo, bio, birthdate, password, firstName, middleName, lastName, hideGender, numberOfPenalty) VALUES ('${id}','${email}', '${gender}','', '','','${birthdate}','${password_hash}', '${firstName}','','${lastName}',0,0)`;
    db.query(sql, function (err) {
        if (err) throw err;
        console.log("register success")
        res.json("register success")
    });
});

module.exports = router;