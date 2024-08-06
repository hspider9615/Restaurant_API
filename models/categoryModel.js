const mongoose = require('mongoose');

// Schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Category title is requires`],
    },
    imageUrl: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JQHbFgi_0jOMcGT1zoWOlDv4rG4IizvJ5pT_q0NNxxwZ2km0dG54_b8UmR6M35h7AVI&usqp=CAU',
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model('category', categorySchema);
