const express = require('express');
const router = express.Router();
const { createJobDetails,getJobDetails,jobApplications,updateStatus,job,getJobDetailById } = require('../controllers/jobDetailsController');
const auth = require('../middleware/auth-middleware');
const { applyForJob } = require('../controllers/applyForJob');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, createJobDetails);
router.get('/', getJobDetails);
router.get('/:jobId',getJobDetailById);
router.post('/:jobId/apply', auth, upload.single('resume'), applyForJob);
router.get('/:jobId/applications',jobApplications)
router.patch('/:jobId/applications/:applicationId',updateStatus)
module.exports = router;
