import User from "../models/User";
import bcrypt from "bcryptjs";

// Temporary users to create
const tempUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    username: "adminuser",
  },
  {
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    username: "regularuser",
  },
];

const createTempUsers = async () => {
  try {
    // Check if users already exist
    for (const tempUser of tempUsers) {
      const user = await User.findOne({ email: tempUser.email });
      if (!user) {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(tempUser.password, 10);

        // Create the user with a username
        const newUser = new User({
          email: tempUser.email,
          password: hashedPassword,
          name: tempUser.name,
          username: tempUser.username, // Include username
        });

        await newUser.save();
        console.log(`Created user: ${tempUser.email}`);
      } else {
        console.log(`User already exists: ${tempUser.email}`);
      }
    }
  } catch (error) {
    console.error("Error creating temporary users:", error);
  }
};

export default createTempUsers;
