const jobDetails = require('../models/Jobs');
const User = require('../models/User');

exports.createJobDetails = async (req, res) => {
  const {jobRole,jobType, industry,minSalary,maxSalary,sections,location ,company ,applicationDeadline  } = req.body;

  try {
    const newJobDetails = new jobDetails({
        jobRole,
        jobType,
        industry,
        minSalary,
        maxSalary,
        sections,
        location ,
        company ,
        applicationDeadline
    });
    const jobdetails = await newJobDetails.save();
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { jobdetails: jobdetails._id } },
      { new: true, useFindAndModify: false }
    );
    res.json(jobdetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getJobDetails = async (req, res) => {
  try {
      const jobs = await jobDetails.find();
      res.json(jobs);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

exports.getJobDetailById = async (req, res) => {
  const { jobId } = req.params;

  try {
      const job = await jobDetails.findById(jobId);
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }
      res.json(job);
  } catch (err) {
      res.status(500).send('Server error');
  }
};


exports.jobApplications= async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await jobDetails.findById(jobId).populate('applications.user');
    res.json({ applications: job.applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateStatus= async (req, res) => {
  const { jobId, applicationId } = req.params;
  const { status } = req.body;

  try {
    const job = await jobDetails.findById(jobId);
    if (!job) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }
    const application = job.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    application.status = status; 
    await job.save(); 
    
    const user =await User.findById(application.user);
    if (!user) {
      console.log('user not found');
      return res.status(404).json({ message: 'user not found' });
    }
    const applied =user.appliedJobs.id(application._id);
    if (!applied) {
      console.log('applied not found',application._id);
      return res.status(404).json({ message: 'Applied not found' });
    }
    applied.status=status;
    await user.save();

    res.status(200).json({ message: 'Application status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};




