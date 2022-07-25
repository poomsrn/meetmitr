const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/database')

router.post('/' , (req, res) => {
    const {email, password} = req.body;
    db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, rows) => {
        if (rows[0] != null) {
            if (!err){
                hash_password = rows[0].password;
                if (bcrypt.compareSync(password, hash_password)) {
                res.json(rows[0]);
                }
                else {
                    res.json("login fail");
                }
            }
            else { console.log(err);}
        }
        else {
            res.json("login fail");
        }
    })
} );

module.exports = router;