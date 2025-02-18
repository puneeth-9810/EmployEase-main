const mongoose=require('mongoose');
const bcrypt= require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    employee: {
        type:Boolean,
        required:true,
    },
    password: {
        type: String,
    },
    personalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalDetails'
    },
    employeeDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails'
    },
    appliedJobs: [
        {
            job: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDetails' },
            resume: { type: String },
            cv: { type: String },
            status: { type: String, default: 'pending' } 
        }
    ],
    jobdetails: [{type: mongoose.Schema.Types.ObjectId, ref:'JobDetails'}],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobDetails' }],
    resetCode: { type: String }
});

UserSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound =await bcrypt.genSalt(10);
        const hash_password= await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    } catch (error) {
        next(error);
    }
});

// json web token
UserSchema.methods.generateToken = async function(){
    try {
       return jwt.sign(
        {
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_KEY,
        {
            expiresIn:"10d",
        }
       );
    } catch (error) {
        console.error(error);
    }
}
const User=new mongoose.model('user',UserSchema);
module.exports=User;