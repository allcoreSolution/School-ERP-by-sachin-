require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    let user = await User.findOne({ email: 'admin@school.com' });
    if (!user) {
       user = await User.findOne({ username: 'admin' });
    }

    if (user) {
        user.password = 'admin123';
        user.isActive = true;
        await user.save();
        console.log("SUCCESS! Admin password reset to 'admin123'");
    } else {
        console.log("No admin user found to reset!");
    }
  } catch(e) {
    console.error("Error:", e);
  } finally {
    process.exit(0);
  }
}

resetPassword();
