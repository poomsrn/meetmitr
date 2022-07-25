const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/database')

router.post('/' , (req, res) => {
    const { sql } = req.body;
    db.query(sql, (err, result) => {
        if (err) throw err;
      res.json( result );
    });
} );

module.exports = router;