const joi = require("joi")

module.exports.createUser = joi.object({
  fullname: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  phoneNumber: joi.number().required(),
})

module.exports.createProduct = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  rating: joi.number().required(),
  category: joi.string().required(),
})

module.exports.login = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
})

module.exports.changePassword = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  newPassword:joi.string().required().min(8),
  confirmPassword: joi.string().required().min(8)

})
