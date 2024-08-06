const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// GET User Info
const getUserController = async (req, res) => {
  try {
    const userId = req.userId;

    // Validation
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: 'Invalid User ID',
      });
    }

    // Find user
    const user = await userModel.findById(userId);

    // Check user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }

    // Hide password
    user.password = undefined;

    // Respond
    res.status(200).send({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get User API',
      error,
    });
  }
};

// Update User
const updateUserController = async (req, res) => {
  try {
    const userId = req.userId;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid User ID',
      });
    }

    // Find User
    const user = await userModel.findById(userId);

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Update user fields if provided
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Save updated user
    await user.save();

    // Respond
    res.status(200).send({
      success: true,
      message: 'User Updated Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Update User API',
      error,
    });
  }
};

// Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }

    // Find user by email and answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Invalid credentials or user not found',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    // Save user
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password Reset Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Password Reset API',
      error,
    });
  }
};

// Update User Password

const updatePasswordController = async (req, res) => {
  try {
    // find user
    const userId = req.userId;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid User ID',
      });
    }

    // Find User
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide Old OR New Password',
      });
    }
    // Check user password || compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: `Invalid Old Password`,
      });
    }
    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: `Password Updated`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Password Update API',
      error,
    });
  }
};

// Delete profile || Account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: `Your Account has been Deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Delete Profile API',
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
