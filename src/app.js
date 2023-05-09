const express = require("express");
const path = require('path');
const fs = require("fs");
const hbs = require("hbs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { timeStamp } = require("console");
var cors = require('cors');
app.use(cors('*'));
var nm = require('nodemailer');
mongoose.set('strictQuery', true);
const port = 8000;

// Get the mongoose connection conn.js file
require("./db/conn");

// For get the Register schema which is for complaint form
const Complaint = require("./models/complaint");

// For get the Login schema which is for login form
const Login = require("./models/loginSchema");
const adminlogin = require("./models/adminschema");
const Signup = require("./models/signup");

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

// Home file
app.get('/', (req, res) => {
    res.render('home.hbs');
});

// For User login
app.get('/login', (req, res) => {
    res.render("login");
});

// Complaint form
app.get('/register', (req, res) => {
    res.render("register");
});

// Client form
app.get('/client', (req, res) => {
    res.render("client");
});

// For admin login
app.get('/adminlogin', (req, res) => {
    res.render("adminlogin");
});

// Faculty head login
app.get('/falogin', (req, res) => {
    res.render("fahead");
});

// Lab assistant Login
app.get('/astlogin', (req, res) => {
    res.render("astlogin");
});

// Admin Login
app.get('/admin', (req, res) => {
    res.render("admin");
});

// To see all the complaints
app.get('/admincomplaint', (req, res) => {
    Complaint.getAllComplaints((err, complaints) => {
        if (err) throw err;

        res.render('admincomplaint', {
            complaints: complaints
        });
    });
});

app.get('/astcomp', (req, res) => {
    try {
        Complaint.find({ flag: true }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.render('astcomp', { complaints: complaints });
            }
        })
    } catch (error) {
        console.log(error);
    }
});

app.get('/facomp', (req, res) => {
    Complaint.find({ Query: "Computer" }, (err, complaints) => {
        if (err) {
            console.log(err);
        } else {
            res.render('facomp', { complaints: complaints });
        }
    })
});

app.get('/adduser', (req, res) => {
    res.render('adduser');
});

app.get('/remove-user', (req, res) => {

    res.render('remove-user');
});

app.get('/update/:id', function (req, res) {
    Complaint.findByIdAndUpdate(req.params.id, { $set: { Status: 'Processing', flag: 'true' } }, (err, complaints) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.render('sending',{complaints: complaints});
            res.send(`
            <script>
              alert('Complaint sended successfully');
              window.location.href = '/facomp'; // Redirect to homepage
            </script>
          `);
        }
    });
});

app.get('/Solved/:id', function (req, res) {
    Complaint.findByIdAndUpdate(req.params.id, { $set: { Status: 'Solved' } }, (err, complaints) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.render('sending',{complaints: complaints});
            res.send(`
            <script>
              alert('Sending action');
              window.location.href = '/astcomp'; // Redirect to homepage
            </script>
          `);
        }
    });
});

app.get('/Noc/:id', function (req, res) {
    Complaint.findByIdAndUpdate(req.params.id, { $set: { Status: 'Noc' } }, (err, complaints) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.render('sending',{complaints: complaints});
            res.send(`
            <script>
              alert('sending action');
              window.location.href = '/assistant'; // Redirect to homepage
            </script>
          `);
        }
    });
});

// Get all complaint of particular email ID
app.get('/complaint', (req, res) => {
    try {
        Complaint.find({ Email: email }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.render('complaint', { complaints: complaints });
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// For sorting the complaint
app.get('/search', (req, res) => {
    try {
        Complaint.find({ $or: [{ Department: { '$regex': req.query.dsearch } }, { Date: { '$regex': req.query.dsearch } }] }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.render('admin', { complaints: complaints });
            }
        })
    } catch (error) {
        console.log(error);
    }
});


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nm.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'kevinpaghadal8@gmail.com',
        pass: 'orzlqbzozgcbzutn',
    }
});

let email;
let sharedVariable = {};

app.post('/send', async (req, res) => {
    email = req.body.Email;

    Signup.findOne({ Email: email }, { Firstname: 1, Lastname: 1, Phone: 1 }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!result) {
            res.send(`
            <script>
              alert('no user found');
              window.location.href = '/login';
            </script>
          `);
            return;
        }
        console.log(result);
        const { Firstname, Lastname, Phone } = result;
        sharedVariable.FirstName = Firstname; // Store the Firstname variable in the shared variable
        sharedVariable.LastName = Lastname;
        sharedVariable.Phone = Phone;
    });

    // send mail with defined transport object
    var mailOptions = {
        to: req.body.Email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('loginOTP');
    });
});



app.post('/adduser', async (req, res) => {
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    let errors = false;
    if (errors) {
        res.render('complaint', {
            errors: errors
        });
    } else {
        const newUser = new Signup({
            Firstname: Firstname,
            Lastname: Lastname,
            Email: Email,
            Phone: Phone
        });
        Signup.addUser(newUser, (err, user) => {
            if (err) throw err;
            res.send(`
            <script>
              alert('Successfully added user');
              window.location.href = '/adduser'; // Redirect to homepage
            </script>
          `);
        });
    }

});


app.post('/remove-user', (req, res) => {
    try {
        Signup.deleteOne({ Email: req.body.Email }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.send(`
                <script>
                  alert('User Deleted successfully');
                  window.location.href = '/admin'; // Redirect to homepage
                </script>
              `);
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// To get only computer related complaints
app.post('/astlogin', async (req, res) => {

    try {
        Complaint.find({ flag: true }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.render('assistant', { complaints: complaints });
            }
        })
    } catch (error) {
        console.log(error);
    }
});

// For show Fa-head complaint --> Only Computer related complaint
app.post('/falogin', (req, res) => {
    try {
        Complaint.find({ Query: "Computer" }, (err, complaints) => {
            if (err) {
                console.log(err);
            } else {
                res.render('facomp', { complaints: complaints });
            }
        })
    }
    catch (error) {
        res.status(404).send(error)
    }
})

app.post('/verify', async (req, res) => {

    if (req.body.otp == otp) {
        try {
            Complaint.find({ Email: req.query.Email }, (err, complaints) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('client', { complaints: complaints });
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.render('otp', { msg: 'otp is incorrect' });
    }
});

app.post('/resend', function (req, res) {
    var mailOptions = {
        to: kevin,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp', { msg: "otp has been sent" });
    });

});


// For login file  --> It opens the login.hbs File
app.post('/login1', async (req, res) => {

    try {
        const loginUser = new Login({
            Email: req.body.Email,
        });
        const loginSuccess = await loginUser.save();
        res.status(201).render("register");
    }
    catch (e) {
        res.status(400).send("Login detail not fulfilled");
    }
});


app.post('/registerComplaint', (req, res) => {
    const Firstname = sharedVariable.Firstname;
    const Lastname = sharedVariable.Lastname;
    const Phone = sharedVariable.Phone;
    const Email = email;
    const Department = req.body.Department;
    const Query = req.body.Query;
    const Computer = req.body.Computer;
    const OtherQuery = req.body.OtherQuery;
    const Note = req.body.Note;

    const postBody = req.body;
    console.log(postBody);
    let errors = false;
    if (errors) {
        res.status(422).render('complaint', {
            errors: errors
        });
    } else {
        const newComplaint = new Complaint({
            Firstname: Firstname,
            Lastname: Lastname,
            Email: Email,
            Department: Department,
            Query: Query,
            Computer: Computer,
            OtherQuery: OtherQuery,
            Phone: Phone,
            Note: Note,
        });
        Complaint.registerComplaint(newComplaint, (err, complaint) => {
            if (err) throw err;
            res.send(`
            <script>
              alert('Complaint submmited successfully');
              window.location.href = '/client'; // Redirect to homepage
            </script>
            `);
        });
    }
});

app.post("/adminlogin", async (req, res) => {
    try {
        const adminloginUser = new adminlogin({
            Email: req.body.Email,
            Password: req.body.Password
        });
        const adminloginSuccess = await adminloginUser.save();
        Complaint.getAllComplaints((err, complaints) => {
            if (err) throw err;

            res.render('admin', {
                complaints: complaints
            });
        });
    }
    catch (e) {
        res.status(400).send("Login detail not fulfilled");
    }
})


app.get('*', (req, res) => {
    res.render('pageNotFound')
})

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port} `);
});