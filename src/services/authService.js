const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    console.log("++++++++++++++++++++");

    // Destructure the new fields
    const { email, password, role, fullname, mobilenumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      fullname,
      mobilenumber,
    });

    // Save the user to the database
    await newUser.save();
    return res.status(201).json({ message: `User registered with email ${email}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email instead of username
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ status:400, message: `User with email ${email} not found` });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status:400, message: `Invalid credentials` });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: 200,token, role: user.role });
  } catch (err) {
    console.log(err);
    res.status(500).json({status:500, message: `Something went wrong` });
  }
};

module.exports = {
  register,
  login,
};
