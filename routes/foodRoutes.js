const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
} = require('../controllers/foodController');

const router = express.Router();

// Routes
// Create Food || POST
router.post('/create', authMiddleware, createFoodController);

// Get All  || GET
router.get('/getAll', getAllFoodController);

// Get Single Food  || GET
router.get('/get/:id', getSingleFoodController);

// Get Food By Restaurant  || GET
router.get('/getByRestaurant/:id', getFoodByRestaurantController);

// update Food || UPDATE
router.post('/update/:id', authMiddleware, updateFoodController);

// Delete Food || Delete
router.delete('/delete/:id', authMiddleware, deleteFoodController);

module.exports = router;
