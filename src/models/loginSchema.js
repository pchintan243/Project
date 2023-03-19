const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    Email: {
        type: String,
    }
});

const Login = new mongoose.model('Login', loginSchema);

module.exports = Login;