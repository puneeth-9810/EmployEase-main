const User = require('../models/User');
const JobDetails = require('../models/Jobs');

exports.saveJob = async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        const user = await User.findById(userId);
        const job = await JobDetails.findById(jobId);

        if (!user || !job) {
            return res.status(404).json({ message: 'User or Job not found' });
        }
        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({ message: 'Job already saved' });
        }
        user.savedJobs.push(jobId);
        await user.save();

        res.status(200).json({ message: 'Job saved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getSavedJobs = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('savedJobs');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.savedJobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.removeSavedJob = async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        await user.save();

        res.status(200).json({ message: 'Job removed from saved jobs' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
