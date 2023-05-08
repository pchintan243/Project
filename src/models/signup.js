const mongoose = require('mongoose');
require("../db/conn");

const SignupSchema = new mongoose.Schema({
    Firstname: {
        type: String
    },
    Lastname: {
        type: String
    },
    Phone: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    }
});

const Signup = module.exports = mongoose.model('Signup', SignupSchema);

module.exports = Signup;

module.exports.addUser = function (newUser, callback) {
    newUser.save(callback);
}