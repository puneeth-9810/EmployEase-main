const express = require('express');
const { socialLogin } = require('../controllers/firebaseController');
const router = express.Router();

router.post('/social-login', socialLogin);

module.exports = router;
