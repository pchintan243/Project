const express = require("express");
const path = require('path');
const fs = require("fs");
const hbs = require("hbs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const pdfkit = require('pdfkit');
const { timeStamp } = require("console");
mongoose.set('strictQuery', true);
const port = 8000;

require("./db/conn");

const Register = require("./models/registerSchema");
const Login = require("./models/loginSchema");

// const staticPath = path.join(__dirname, "../img/Aadit.jpg");
// app.use(express.static(staticPath));

app.set("view engine", "hbs");

const templatePath = path.join(__dirname, "../templates/views/");
app.set("views", templatePath);


const partialPath = path.join(__dirname, "../templates/partials/");
hbs.registerPartials(partialPath);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For main file: index.hbs
app.get('/', (req, res) => {
    res.render("index");
});

// For login: login.hbs
app.get('/login', (req, res) => {
    res.render("login");
});

// For query file: query.hbs
app.get('/query', (req, res) => {
    res.render("query");
});


// For login file  --> It opens the login.hbs File
app.post('/login', async (req, res) => {
    // const myData = new Login(req.body);
    // myData.save().then(() => {
    //     res.render("query")
    // }).catch(() => {
    //     res.status(400).send("Please fill all the detail correctly..!!")
    // });

    try {
        const loginUser = new Login({
            Email: req.body.Email,
            Password: req.body.Password
        });
        const loginSuccess = await loginUser.save();
        res.status(201).render("query");
    }
    catch (e) {
        res.status(400).send("Login detail not fulfilled");
    }
});



// For query file: query.hbs --> It sends the conformations your complaints was taken or not
app.post('/query', async (req, res) => {
    // const myData = new Register(req.body);
    // myData.save().then(() => {
    //     res.send("Your complaint registered succesfully..!!")
    // }).catch(() => {
    //     res.status(400).send("Please fill all the detail correctly..!!")
    // });

    try {
        const registerUser = new Register({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Date: req.body.Date,
            Branch: req.body.Branch,
            Query: req.body.Query,
            OtherQuery: req.body.OtherQuery,
            Computer: req.body.Computer,
            Password: req.body.Password,
            QueryDate: req.body.QueryDate,
            Note: req.body.Note
        });
        const registered = await registerUser.save();
        res.status(201).send("Your complaint registered succesfully..!!");

    }
    catch (e) {
        res.status(400).send("Please fill all the detail correctly..!!")
    }
});

app.get('*', (req, res) => {
    res.status(404).render("pageNotFound");
});


// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});