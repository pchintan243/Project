const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.set('strictQuery', true);
const port = 6200;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/hello');
    console.log("We are connecting bro..");
}

// Define mongoose schema
const helloSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Branch: String,
    Query: String,
    OtherQuery: String,
    Computer: String,
    Phone: String,
    Note: String
});

const Hello = mongoose.model('Hello', helloSchema);

const mainSchema = new mongoose.Schema({
    Email: String,
    Password: String
});

const Main = mongoose.model('Main', mainSchema);

// Express specific stuff
const staticPath = path.join(__dirname)
app.use(express.static(staticPath));
app.use(express.urlencoded());


//Endpoints
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/QueryForm', (req, res) => {
//     res.sendFile(path.join(__dirname + '/QueryForm.html'));
// });

app.post('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html')); 
    var myData = new Main(req.body);
    myData.save();
});



app.post('/QueryForm.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
    var myData = new Hello(req.body);
    myData.save().then(() => {
        res.send("This item has been saved in the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});