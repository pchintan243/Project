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

// get the mongoose connection conn.js file
require("./db/conn");

// For get the Register schema which is for complaint form
const Register = require("./models/registerSchema");

// For get the Login schema which is for login form
const Login = require("./models/loginSchema");

// const staticPath = path.join(__dirname, "../img/Aadit.jpg");
// app.use(express.static(staticPath));

// set the view engine as a handlebars(hbs)
app.set("view engine", "hbs");

// Get the path of views directory
const templatePath = path.join(__dirname, "../templates/views/");
app.set("views", templatePath);

// Get the path of partials directory
const partialPath = path.join(__dirname, "../templates/partials/");
// Getting the partials as hbs
hbs.registerPartials(partialPath);


app.use(express.json());
// For get the data in mongodb compass
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

    // In this Schema We set the schema value depending on query basis
    try {
        // Get the value of Query
        const queryValue = req.body.Query;

        // For query Computer
        if (queryValue === "Computer") {
            const registerUser = new Register({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Date: req.body.Date,
                Query: req.body.Query,
                Computer: req.body.Computer,
                Branch: req.body.Branch,
                Password: req.body.Password,
                QueryDate: req.body.QueryDate,
                Note: req.body.Note
            });

            // Save the data in database and send one conformation to the user
            const registered = await registerUser.save();
            res.status(201).send("Your complaint registered succesfully..!!");
        }


        // For OtherQuery
        else if (queryValue === "OtherQuery") {
            const registerUser = new Register({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Date: req.body.Date,
                Query: req.body.Query,
                OtherQuery: req.body.OtherQuery,
                Branch: req.body.Branch,
                Password: req.body.Password,
                QueryDate: req.body.QueryDate,
                Note: req.body.Note
            });

            const registered = await registerUser.save();
            res.status(201).send("Your complaint registered succesfully..!!");
        }

        else {
            const registerUser = new Register({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Date: req.body.Date,
                Query: req.body.Query,
                Branch: req.body.Branch,
                Password: req.body.Password,
                QueryDate: req.body.QueryDate,
                Note: req.body.Note
            });
            const registered = await registerUser.save();
            res.status(201).send("Your complaint registered succesfully..!!");
        }
    }
    // If some type of error will occur when user filling wrong data or blank data as well
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