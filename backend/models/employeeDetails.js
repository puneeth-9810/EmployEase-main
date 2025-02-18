const mongoose = require('mongoose');

const employeeDetailsSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    professionalEmail: { type: String },
    phone:{ type: String },
    jobTitle: { type: String },
    company: { type: String },
    website: { type: String },
    headquaters: { type: String },
    type: { type: String },
    size: { type: String },
    logo: { type: String },
    banner: { type: String }
});

module.exports = mongoose.model('employeeDetails', employeeDetailsSchema);
