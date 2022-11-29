const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor () {
        this.connection = null;
    }

    connect () {
        //log connection to database
        console.log("Connecting to database...");
        //connect to database
        mongoose.connect(process.env.DB_URL, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            }).then(() => {
                console.log("Connected to database");
                this.conneciton = mongoose.connection;
            }).catch((err) => {
                console.error("Error connecting to database");
                console.error(err);
        });
    }
}

module.exports = Database;