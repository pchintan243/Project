const mongoose = require('mongoose');

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

const Login = new mongoose.model('Login', loginSchema);

module.exports = Login;