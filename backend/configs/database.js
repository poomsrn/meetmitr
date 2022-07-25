const mongoose = require('mongoose');
const mysql = require("mysql");

const mongoURI = "mongodb+srv://admin:admin@cluster0.eyww5.mongodb.net/myFirstDatabase";

const initServer = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to mongoDB !!");

    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = initServer;