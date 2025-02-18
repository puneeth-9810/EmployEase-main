const mongoose = require('mongoose');

const jobDetailsSchema = new mongoose.Schema({
    jobRole:{ type: String },
    jobType:{ type: String },
    industry:{ type: String },
    minSalary:{ type: String },
    maxSalary:{ type: String },
    sections: [
        {
            name: { type: String },
            description: { type: String }
        }
    ],
    location: { type: String},
    company: { type: String},
    applicationDeadline: { type: Date },
    postedDate: { type: Date, default: Date.now },
    applications: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        resume: { type: String },
        cv: { type: String },
        status: { type: String, default: 'pending' }
    }]
});

module.exports = mongoose.model('JobDetails', jobDetailsSchema);
