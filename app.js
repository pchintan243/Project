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
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    gender : String,
    branch : String,
    query : String,
    other : String,
    computer : String,
    phone : Number,
    age : Number,
    note : String
});

const Hello = new mongoose.model('Hello', helloSchema);


// Express specific stuff
const staticPath = path.join(__dirname)
app.use(express.static(staticPath));
app.use(express.urlencoded());

// const templatePath = path.join(__dirname);
// app.use(express.staticPath(templatePath));
//Endpoints
app.get('/', (req, res) => {

});

app.get('/QueryForm', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
});

// app.get('/contact', (req, res) => {
//     const con = "This is the best content on the internet";
//     const params = { 'title': 'pubg is the best game', "content": con };
//     res.status(200).render('contact.pug', params);
// });

app.post('/QueryForm.html', (req, res) => {
    // res.sendFile(path.join(__dirname + '/QueryForm.html'));
    var myData = new Hello(req.body);
    myData.save().then(() => {
        res.send("This item has been saved in the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});