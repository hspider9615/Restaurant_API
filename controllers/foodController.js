const foodModel = require('../models/foodModel');

//  Create Food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      descriptions,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !descriptions || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }
    const newFood = new foodModel({
      title,
      descriptions,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: 'New Food Item Created',
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Create Food API',
      error,
    });
  }
};

// Get All Food
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: 'No Food Item Was Found',
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get All Food API',
      error,
    });
  }
};

// Get Single Food
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'No ID Found OR Please Provide ID',
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food With his ID',
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get Single Food API',
      error,
    });
  }
};

// Get Food By Restaurant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'No ID Found OR Please Provide ID',
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food With his ID',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Food Base on Restaurant',
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get Single Food API',
      error,
    });
  }
};

// Update Food Item
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;

    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: 'No Food ID was Found',
      });
    }

    const food = await foodModel.findById(foodID);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food Found',
      });
    }

    const {
      title,
      descriptions,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        descriptions,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: 'Food Item was Updated',
      food: updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Update Food API',
      error,
    });
  }
};

// Delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'Provide Food Id',
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food with id',
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: 'Food Item Deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Delete Food API',
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
};
