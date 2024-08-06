const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require('../controllers/restaurantController');

const router = express.Router();

// Routes
// Create restaurant || POST
router.post('/create', authMiddleware, createRestaurantController);

// Get all restaurant || GET
router.get('/getAll', getAllRestaurantController);

// Get Restaurant By Id || GET
router.get('/get/:id', getRestaurantByIdController);

// Delete Restaurant || DELETE
router.delete('/delete/:id', authMiddleware, deleteRestaurantController);

module.exports = router;
