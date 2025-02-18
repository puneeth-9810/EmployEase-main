const express = require('express');
const router = express.Router();
const { createemployeeDetails,getEmployeeDetails,getEmployeeDetailById } = require('../controllers/employeeDetailsController');
const auth = require('../middleware/auth-middleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.fields([{ name: 'logo' }, { name: 'banner' }]), createemployeeDetails);
router.get('/',getEmployeeDetails);
router.get('/:employeeId',getEmployeeDetailById)
module.exports = router;