const express=require('express');
const router=express.Router();
const {home ,register,login,user,updateApplicationStatus,sendResetCode,resetPassword }=require('../controllers/auth-controller');
const authMiddleware =require('../middleware/auth-middleware');

router.route('/').get(home);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(authMiddleware,user);
router.route('/updateApplicationStatus').patch(authMiddleware, updateApplicationStatus); // New route
router.post('/forgot', sendResetCode);
router.patch('/reset', resetPassword);

module.exports=router;