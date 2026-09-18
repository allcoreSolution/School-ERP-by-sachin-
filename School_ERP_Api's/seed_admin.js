require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({ name: 'Admin', permissions: ['all'], description: 'Super Admin' });
    }

    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      user = await User.create({
        username: 'admin',
        email: 'admin@school.com',
        password: 'password123',
        role: adminRole._id,
      });
      console.log("Created Admin User Document.");
    } else {
       console.log("Admin User already exists.");
    }

    console.log("\n==================================");
    console.log("SUCCESS! ADMIN IS READY.");
    console.log("Login Email/Username: admin");
    console.log("Password: password123");
    console.log("==================================\n");

  } catch(e) {
    console.error("Error:", e);
  } finally {
    process.exit(0);
  }
}

createAdmin();
