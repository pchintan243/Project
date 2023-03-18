const mongoose = require('mongoose');

const adminloginSchema = new mongoose.Schema({
    Email: {
        type: String,
        enum: ["patelchintan843@gmail.com"]
    },
    Password: {
        type: String,
        // enum: ["123"]
    }
});

const adminLogin = new mongoose.model('adminLogin', adminloginSchema);

module.exports = adminLogin;