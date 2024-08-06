const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: `Please Provide All Fields`,
      });
    }

    // Validate name
    if (!/^[a-zA-Z ]*$/.test(userName)) {
      return res.status(400).send({
        success: false,
        message: `Invalid username. Only alphabets and spaces are allowed.`,
      });
    }

    // Validate email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).send({
        success: false,
        message: `Invalid email format.`,
      });
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).send({
        success: false,
        message: `Invalid phone number. It should be a 10-digit number.`,
      });
    }

    // password too short
    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: `Password must be at least 8 characters long.`,
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: `Email already registered. Please login.`,
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: `Successfully registered.`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Register API`,
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: `PLease Provide Email OR Password`,
      });
    }
    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `User Not Found`,
      });
    }
    // Check user password || compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: `Invalid Credentials`,
      });
    }

    // Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: `Login Successfully`,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login API`,
      error,
    });
  }
};

module.exports = { registerController, loginController };
