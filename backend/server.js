require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

const router=require('./routes/auth-router');
const personal=require('./routes/PersonalDetailsRoutes');
const firebase=require('./routes/firebaseRoutes');
const employee= require('./routes/EmployeeRoutes');
const job=require('./routes/jobRoutes');
const savedJobs = require('./routes/savedJobsRoutes');

const corsOptions = {
    origin:"*",
    methods:"GET,PUT,POST,DELETE,PATCH,HEAD",
    credentials:true,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/api/auth',router);
app.use('/api/firebase', firebase);
app.use('/api/personalDetails', personal);
app.use('/api/employeeDetails',employee);
app.use('/api/jobDetails',job)
app.use('/api/savedJobs', savedJobs);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
