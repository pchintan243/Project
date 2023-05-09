const mongoose = require('mongoose');
require("../db/conn");

const ComplaintSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Department: String,
    Query: String,
    OtherQuery: String,
    Computer: String,
    Phone: String,
    Note: String,
    Date: { type: String, default: new Date() },
    Status: {
        type: String,
        default: 'Pending'
    },
    flag: {
        type: String,
        default: 'false'
    }
});

const Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);

module.exports.registerComplaint = function (newComplaint, callback) {
    newComplaint.save(callback);
}

module.exports.getAllComplaints = function (callback) {
    Complaint.find(callback);
}
module.exports.getAllsearch = function (callback) {
    Complaint.find({ $or: [{ author: { '$regex': req.query.dsearch } }, { books: { '$regex': req.query.dsearch } }] });
}
