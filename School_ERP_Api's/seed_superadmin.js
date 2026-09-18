require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');

async function createSuperAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    let adminRole = await Role.findOne({ name: 'SuperAdmin' });
    if (!adminRole) {
      adminRole = await Role.create({ name: 'SuperAdmin', permissions: ['all'], description: 'Platform Super Admin' });
    }

    let user = await User.findOne({ email: 'superadmin@erp.com' });
    if (!user) {
      user = await User.create({
        username: 'superadmin',
        email: 'superadmin@erp.com',
        password: 'admin123',
        role: adminRole._id,
      });
      console.log("Created SuperAdmin User Document.");
    } else {
       console.log("SuperAdmin User already exists. Updating password to admin123...");
       user.password = 'admin123';
       await user.save();
    }

    console.log("\n==================================");
    console.log("SUCCESS! SUPERADMIN IS READY.");
    console.log("Login Email: superadmin@erp.com");
    console.log("Password: admin123");
    console.log("==================================\n");

  } catch(e) {
    console.error("Error:", e);
  } finally {
    process.exit(0);
  }
}

createSuperAdmin();
