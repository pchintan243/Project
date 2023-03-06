const express = require("express");
const path = require("path");
const fs = require("fs");
const hbs = require("hbs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const pdfkit = require('pdfkit');
const { timeStamp } = require("console");
mongoose.set('strictQuery', true);
const port = 8001;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ComplaintDB');
    console.log("We are connecting bro..");
}

// Define schema for QueryFrom file --> QueryFrom.html
const complaintSchema = new mongoose.Schema({
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

const Register = mongoose.model('Register', complaintSchema);


// Define schema for main file --> index.html
const loginSchema = new mongoose.Schema({
    Email: {
        type: String,
        // enum: ["chintan@gmail.com", "patelchintan@gmail.com"]
    },
    Password: {
        type: String,
        // enum: ["123"]
    }
});

const Login = mongoose.model('Login', loginSchema);


// Set the path for index file or QueryFrom file
const staticPath = path.join(__dirname);
app.use(express.static(staticPath));

// For save the data in to the database
app.use(express.urlencoded({ extended: false }));


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
    var myData = new Login(req.body);
    myData.save();
});

// For QueryForm file: QueryForm.html --> It sends the conformations your complaints was taken or not
app.post('/QueryForm.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/QueryForm.html'));
    var myData = new Register(req.body);
    myData.save().then(() => {
        res.send("Your complaint registered succesfully..!!")
    }).catch(() => {
        res.status(400).send("Please fill all the detail correctly..!!")
    });
});

// const PDFDocument = require('pdfkit')

// exports.createPdf = async (req, res) => {
//     // Save form data to the database
//     const pdfdemo = new pdfdemo(req.body)
//     await pdfdemo.save();

//     const document = new PDFDocument()
//     // PDF generation logic...
// }

// const pagePath = path.join(__dirname, "/img");
// app.use(express.static(pagePath));

// app.get('*', (req, res) => {
//     // res.status(404).render("pageNotFound");
// });


// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});