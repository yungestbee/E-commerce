const express = require("express")

const {
  sign_up,
  create_product,
  login,
  viewAllProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  changePassword,
} = require("../controllers/proControllers")

const router = express.Router()

router.post("/signup", sign_up)

router.post("/product", create_product)

router.get("/product:_id", singleProduct)

router.get("/products", viewAllProducts)

router.get("/login", login)

router.post("/updateProduct:_id", updateProduct)

router.post("/deleteProduct:_id", deleteProduct)

router.post("/changePassword", changePassword)

module.exports = router
