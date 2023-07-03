const mongoose = require("mongoose")

module.exports.userSchema = new mongoose.Schema({
  fullname: String,
  email: {
    unique: true,
    type: String,
  },
  password: String,
  phoneNumber: Number,
})

module.exports.productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  rating: Number,
  category: String,
})
