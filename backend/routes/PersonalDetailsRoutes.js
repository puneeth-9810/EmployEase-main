const express = require('express');
const router = express.Router();
const { createPersonalDetails,getPersonalDetails,getPersonalDetailsById } = require('../controllers/PersonalDetailsController');
const auth = require('../middleware/auth-middleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), createPersonalDetails);
router.get('/', getPersonalDetails);
router.get('/:pId',getPersonalDetailsById);
module.exports = router;
