// Place Order

const orderModel = require('../models/orderModel');

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'Please Food cart OR Payment Method',
      });
    }
    let total = 0;
    // // Calculate total price
    // cart.map((i) => {
    //   total += i.price;
    // });

    // Calculate total price
    cart.forEach((item) => {
      total += parseFloat(item.price);
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.userId,
      status: 'preparing',
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: 'Order Placed Successfully',
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Place Order API',
      error,
    });
  }
};

// Change Order Status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide orderId',
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Order Status Updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Order Status API',
      error,
    });
  }
};

module.exports = { placeOrderController, orderStatusController };
