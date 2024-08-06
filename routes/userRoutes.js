const express = require('express');
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET User || GET
router.get('/getUser', authMiddleware, getUserController);

// Update Profile
router.put('/updateUser', authMiddleware, updateUserController);

// password update
router.post('/updatePassword', authMiddleware, updatePasswordController);

// Reset password
router.post('/resetPassword', authMiddleware, resetPasswordController);

// Delete User
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController);

module.exports = router;
