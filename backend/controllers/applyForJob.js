const User = require('../models/User');
const JobDetails = require('../models/Jobs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

exports.applyForJob = async (req, res) => {
    const { userId, cv } = req.body;
    const { jobId } = req.params;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const resumeBuffer = req.file.buffer;
    const resumeName = `${Date.now()}-${req.file.originalname}`;
    const resumePath = path.join('uploads', resumeName);
    fs.writeFileSync(path.join(__dirname, '..', resumePath), resumeBuffer);

    try {
        const user = await User.findById(userId);
        const job = await JobDetails.findById(jobId);

        if (!user || !job) {
            return res.status(404).json({ message: 'User or Job not found' });
        }

        const applicationId = new mongoose.Types.ObjectId();

        user.appliedJobs.push({ _id: applicationId, job: jobId, resume: resumePath, cv });
        await user.save();

        job.applications.push({ _id: applicationId, user: userId, resume: resumePath, cv });
        await job.save();

        res.status(200).json({ message: 'Job application successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


