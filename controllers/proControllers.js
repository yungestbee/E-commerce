const {
  createUser,
  createProduct,
  login,
  changePassword,
} = require("../validators/joi")
const mongoose = require("mongoose")
const { productSchema, userSchema } = require("../models/schema")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const products = mongoose.model("products", productSchema)
const user = mongoose.model("user", userSchema)

const app = express()
app.use(express.json())

module.exports.sign_up = async (req, res) => {
  try {
    const { error, value } = createUser.validate(req.body)
    console.log(value)
    const salt = await bcrypt.genSalt()
    const Hashedpassword = await bcrypt.hash(value.password, salt)

    const User = new user({
      fullName: value.fullName,
      email: value.email,
      password: Hashedpassword,
      phoneNumber: value.phoneNumber,
    })
    const token = jwt.sign(
      { id: user._id, Hashedpassword },
      process.env.JWT_SECRET_KEY
    )
    User.save().then(() => {
      res.status(201).send(
        `Thank you ${value.fullName}, your account/profile has been created`
        //   token
      )
      console.log(User)
    })
  } catch (error) {
    res.status(400).json(error)
    console.log(error)
  }
}

module.exports.create_product = (req, res) => {
  try {
    const { error, value } = createProduct.validate(req.body)
    const Products = new products({
      name: value.name,
      price: value.price,
      description: value.description,
      rating: value.rating,
      category: value.category,
    })
    Products.save().then(() => {
      res.send(`${value.name} successfuly saved.`)
      console.log(Products)
    })
  } catch (error) {
    res.status(400).json(error)
    console.log(error)
  }
}

module.exports.login = async (req, res) => {
  const { error, value } = login.validate(req.body)
  if (error) {
    return res.status(400).send(error)
  } else {
    try {
      const check = await user.findOne({ email: value.email })
      if (value.email === check.email && value.password === check.password) {
        res.status(200).send("user succefully logged in")
      } else {
        res.status(400).send("Username or Pasword is invalid")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports.viewAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find({})
    res.status(200).json(allProducts)
  } catch (error) {
    console.log(error)
  }
}

module.exports.singleProduct = async (req, res) => {
  try {
    const singleProducts = await products.findById({
      _id: req.params._id,
    })
    res.status(200).json(singleProducts)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const updateProducts = await products.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      { $set: { price: req.body.price } }
    )
    res.status(200).send("product successfully updated")
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

module.exports.deleteProduct = async (req, res) => {
  try {
    console.log(req.params._id)
    const deleteProducts = await products.findOneAndDelete({
      _id: req.params._id,
    })
    res.status(200).send("product successfully deleted")
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

module.exports.changePassword = async (req, res) => {
  const { error, value } = changePassword.validate(req.body)
  if (error) {
    return res.status(400).send(error)
  } else {
    try {
      const check = await user.findOne({ email: value.email })
      console.log(value.email, check.email)
      if (value.email !== check.email) {
        res.status(400).send("Username or Pasword is invalid")
      } else {
        bcrypt.compare(value.password, check.password, async (err, isMatch) => {
          if (err) {
            return res.status(400).send("invalid password")
          } else if (isMatch) {
            try {
              if (value.newPassword === value.confirmPassword) {
                const salt = await bcrypt.genSalt()
                console.log(salt)
                const hashUpdate = bcrypt.hash(value.newPassword, salt)
                user.updateOne(
                  { email: value.email },
                  { $set: { password: hashUpdate } }
                )
                res.send("Password changed succesfully")
              } else {
                res.status(400).send("Passwords don't match")
              }
            } catch (error) {
              console.log(error)
            }
          }
        })
        res.status(200)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
