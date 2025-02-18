const admin = require('../firebaseAdmin');
const User = require('../models/User');

exports.socialLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: name,
        email: email,
        employee:false,
      });
      await user.save();
    }

    const jwtToken = await user.generateToken();

    res.json({ user, token: jwtToken });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
