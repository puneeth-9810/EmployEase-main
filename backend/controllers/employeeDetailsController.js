const employeeDetails = require('../models/employeeDetails');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

exports.createemployeeDetails = async (req, res) => {
  const { firstName, lastName, professionalEmail,company , jobTitle, phone,website,headquaters,type,size } = req.body;
  let logoPath = '';
  let bannerPath = '';
  
  
  if (req.files) {
    if (req.files.logo) {
      const logoBuffer = req.files.logo[0].buffer;
      const logoName = `${Date.now()}-${req.files.logo[0].originalname}`;
      logoPath = path.join('uploads', logoName);
      fs.writeFileSync(path.join(__dirname, '..', logoPath), logoBuffer);
    }
    
    if (req.files.banner) {
      const bannerBuffer = req.files.banner[0].buffer;
      const bannerName = `${Date.now()}-${req.files.banner[0].originalname}`;
      bannerPath = path.join('uploads', bannerName);
      fs.writeFileSync(path.join(__dirname, '..', bannerPath), bannerBuffer);
    }
  }
  
  try {
    const newemployeeDetails = new employeeDetails({
      firstName,
      lastName,
      professionalEmail,
      jobTitle,
      phone,
      company,
      website,
      headquaters,
      type,
      size,
      logo:logoPath,
      banner:bannerPath
    });

    const EmpDetails = await newemployeeDetails.save();
    await User.findByIdAndUpdate(req.user._id, { employeeDetails: EmpDetails._id });

    res.json(EmpDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEmployeeDetails = async (req, res) => {
  try {
      const jobs = await employeeDetails.find();
      res.json(jobs);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

exports.getEmployeeDetailById = async (req, res) => {
  const { employeeId } = req.params;

  try {
      const employee = await employeeDetails.findById(employeeId);
      if (!employee) {
          return res.status(404).json({ message: 'Job not found' });
      }
      res.json(employee);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

