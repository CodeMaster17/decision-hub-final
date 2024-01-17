const mongoose = require('mongoose')
const DB = process.env.DATABASE;

if (DB) {
    mongoose.connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log("DataBase Connected")).catch((err) => {
        console.log("Error while connecting database", err);
    })
} else {
    console.log("Database key not present")
}