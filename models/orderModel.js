const mongoose = require('mongoose');

// Schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foods' }],
    payment: { type: Number },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['preparing', 'prepare', 'on the way', 'delivered'],
      default: 'preparing',
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model('Orders', ordersSchema);
