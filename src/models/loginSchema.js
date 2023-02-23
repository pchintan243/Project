const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    Email: {
        type: String,
        enum: ["kevinpaghadal3@gmail.com", "chintan@gmail.com", "patelchintan843@gmail.com"]
    },
    Password: {
        type: String,
        // enum: ["123"]
    }
});

const Login = new mongoose.model('Login', loginSchema);

module.exports = Login;