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

// Define schema for QueryFrom file --> QueryFrom.html
const helloSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Branch: String,
    Query: String,
    OtherQuery: String,
    Computer: String,
    Phone: String,
    Note: String,
    QueryDate: Date
});

const Hello = mongoose.model('Hello', helloSchema);


// Define schema for main file --> index.html
const mainSchema = new mongoose.Schema({
    Email: String,
    Password: String
});

const Main = mongoose.model('Main', mainSchema);


// Set the path for index file or QueryFrom file
const staticPath = path.join(__dirname);
app.use(express.static(staticPath));

// For save the data in to the database
app.use(express.urlencoded());


// For main file: index.html
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));
});

// For QueryForm file: QueryForm.html
app.get('/QueryForm', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
});

// For main file: index.html --> It opens the QueryForm.html File
app.post('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
    var myData = new Main(req.body);
    myData.save();
});

// For QueryForm file: QueryForm.html --> It sends the conformations your complaints was taken or not
app.post('/QueryForm.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
    var myData = new Hello(req.body);
    myData.save().then(() => {
        res.send("Your complaint registered succesfully..!!")
    }).catch(() => {
        res.status(400).send("Please fill all the detail correctly..!!")
    });
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});