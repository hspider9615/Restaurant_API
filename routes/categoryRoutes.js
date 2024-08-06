const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require('../controllers/categoryController');

const router = express.Router();

// Routes
// Create Category || POST
router.post('/create', authMiddleware, createCatController);

// Get All Category || GET
router.get('/getAll', getAllCatController);

// Update Category || PUT
router.put('/update/:id', authMiddleware, updateCatController);

// Delete Category || Delete
router.delete('/delete/:id', authMiddleware, deleteCatController);

module.exports = router;
