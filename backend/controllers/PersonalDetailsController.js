const PersonalDetails = require('../models/PersonalDetails');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

exports.createPersonalDetails = async (req, res) => {
  const { firstName, lastName, professionalEmail, employmentStatus, jobTitle, phone, location, linkedin, github } = req.body;
  let imagePath = '';

  if (req.file) {
    const imageBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`;
    imagePath = path.join('uploads', fileName);

    try {
      fs.writeFileSync(path.join(__dirname, '..', imagePath), imageBuffer);
    } catch (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ msg: 'Error saving image' });
    }
  }

  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ msg: 'User not found in request' });
    }

    const newPersonalDetails = new PersonalDetails({
      firstName,
      lastName,
      professionalEmail,
      employmentStatus,
      jobTitle,
      phone,
      location,
      linkedin,
      github,
      image: imagePath
    });

    const perDetails = await newPersonalDetails.save();
    await User.findByIdAndUpdate(req.user._id, { personalDetails: perDetails._id });

    res.json(perDetails);
  } catch (err) {
    console.error('Error saving personal details:', err.message);
    res.status(500).send('Server error');
  }
};


exports.getPersonalDetails = async (req, res) => {
  try {
      const jobs = await PersonalDetails.find();
      res.json(jobs);
  } catch (err) {
      res.status(500).send('Server error');
  }
}

exports.getPersonalDetailsById = async (req, res) => {
  const { pId } = req.params;

  try {
    const personal = await PersonalDetails.findById(pId);
    if (!personal) {
      return res.status(404).json({ message: 'Personal details not found' });
    }
    res.json(personal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
