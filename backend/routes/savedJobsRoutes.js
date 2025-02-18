const express = require('express');
const router = express.Router();
const { saveJob, getSavedJobs, removeSavedJob } = require('../controllers/savedjobs');
const auth = require('../middleware/auth-middleware');

router.post('/save', auth, saveJob); 
router.get('/:userId/saved', auth, getSavedJobs);
router.delete('/remove', auth, removeSavedJob);

module.exports = router;
