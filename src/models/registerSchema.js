const mongoose = require('mongoose');


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

module.exports = Register;
