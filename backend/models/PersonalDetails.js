const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    professionalEmail: { type: String },
    employmentStatus:{ type: String },
    jobTitle: { type: String },
    phone: { type: String },
    location: { type: String },
    linkedin: { type: String },
    github: { type: String },
    image: { type: String }
});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
