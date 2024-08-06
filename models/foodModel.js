const mongoose = require('mongoose');

// Schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Food title is requires`],
    },
    descriptions: {
      type: String,
      required: [true, `Food Description is requires`],
    },
    price: {
      type: Number,
      required: [true, `Food Price is requires`],
    },
    imageUrl: {
      type: String,
      default:
        'https://www.alamy.com/pizzeria-fast-food-logo-or-label-happy-chef-holding-pizza-and-scapula-in-hands-vector-illustration-image214505582.html?imageid=D9FF9F33-CDCA-4489-BF36-34B4C4EECCA1&p=216817&pn=1&searchId=6abb2d9bbffa42d6deee3c73a6d0bc8e&searchtype=0',
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model('Foods', foodSchema);
