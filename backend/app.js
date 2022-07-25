const express = require("express");
const initServer = require('./configs/database.js');
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/user')

//import routers
const indexRouter = require('./routes/index');
const eventRouter = require('./routes/events');
const registerRouter = require('./routes/register');
const eventFeedRouter = require('./routes/eventFeed');
const eventInfoRouter = require('./routes/eventInfo');
const deleteAccountRouter = require('./routes/deleteAccount');
const reportRouter = require('./routes/report');
const getUserRouter = require('./routes/getUser');
const addFriendRouter = require('./routes/addFriend');
const queryRouter = require('./routes/query');
const db = require('./models/database');
var app = express();
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/event', eventRouter);
app.use('/register', registerRouter);
app.use('/eventFeed', eventFeedRouter);
app.use('/eventInfo', eventInfoRouter);
app.use('/deleteAccount', deleteAccountRouter);
app.use('/report', reportRouter);
app.use('/getUser', getUserRouter);
app.use('/addFriend', addFriendRouter);
app.use('/query', queryRouter);

app.get("/test", (req, res) => {
    db.query("select * from name", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/mongo", (req, res) => {
    User.find(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

//connect db + start server
const PORT = process.env.PORT || 4000;
initServer().then(result => {
    app.listen(PORT, (req, res) => {
        console.log(`Server Started at PORT ${PORT}`);
    });
});