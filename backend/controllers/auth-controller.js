const User = require("../models/User");
const bcrypt= require("bcryptjs");
const PersonalDetails = require("../models/PersonalDetails");
const EmployeeDetails = require("../models/employeeDetails");
const nodemailer = require('nodemailer');

const home =async (req,res) => {
    try {
        res.status(200).send('welcome to register page');
    }catch(error){
        console.log(error);
    }
}

//register logic
const register =async (req,res) => {
    try{

        console.log(req.body);
       const { username, email, employee, password }=req.body;
       const userExist =await User.findOne({email});
       
       if(userExist){
        return res.status(400).json({msg:"email already exits"});
        }

    const userCreated = await User.create({ username,email,employee,password});
    
    res.status(200).json({
        msg:userCreated,
        token:await userCreated.generateToken(),
        userId:userCreated._id.toString(),
    });    
    }catch(error){
        res.status(500).json("internal server error")
    }
}

//login logic
const login =async (req,res) => {
    try{

       const { email, employee, password }=req.body;
       
       const userExist =await User.findOne({email});
       console.log(userExist);
       
       if(!userExist){
        return res.status(400).json({msg:"Invalid Credentials"});
        }
        const user = await bcrypt.compare(password,userExist.password);
    
        const type =(employee===userExist.employee);
    if(user && type){
        res.status(200).json({
            msg:'login successful',
            token:await userExist.generateToken(),
            userId:userExist._id.toString(),
        }); 
    }else {
        console.log('Password Match:', user);

        res.status(401).json({msg:"Invalid Email or Password"})
    }   
    }catch(error){
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json("internal server error")
    }
}

//user logic
const user =async (req,res) => {
    try {
      const userData =req.user;
      const personalDetails = await PersonalDetails.findById(userData.personalDetails);
      const employeeDetails = await EmployeeDetails.findById(userData.employeeDetails);
      console.log(userData); 
      return res.status(200).json({userData,personalDetails,employeeDetails});
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


//status update logic
const updateApplicationStatus = async (req, res) => {
    try {
      const { applicationId, status } = req.body;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const application = user.appliedJobs.id(applicationId);
      if (!application) {
        return res.status(404).json({ msg: "Application not found" });
      }
  
      application.status = status;
      await user.save();
  
      return res.status(200).json({ msg: "Application status updated", application });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tejaakshaykumar970@gmail.com',
    pass: 'gnws lbto ayzr gahf',
  },
});

const sendResetCode = async (req, res) => {
    const { email } = req.body;
    const ResetCode = Math.floor(100000 + Math.random() * 900000).toString();
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ msg: 'User not found.' });
  
      user.resetCode = ResetCode; // Consider hashing
      await user.save();
  
      await transporter.sendMail({
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${ResetCode}`,
      });
  
      res.status(200).json({ msg: 'Reset code sent.' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { code, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ resetCode: code });
      if (!user) return res.status(400).json({ msg: 'Invalid reset code.' });
      
    //   const saltRound =await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(newPassword, saltRound);
      user.password = newPassword;
      user.resetCode = undefined;
      await user.save();
  
      res.status(200).json({ msg: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error); // Log the error
      res.status(500).json({ msg: 'what re Server error', error: error.message });
    }
  };
  


  module.exports={home,register ,login, user, updateApplicationStatus,resetPassword,sendResetCode};

  