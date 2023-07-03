const express = require("express")
const mongoose = require("mongoose")
const proRoutes = require("./Routes/proRoutes")

const app = express()

app.use(express.json())

// const products = mongoose.model("products", productSchema)
// const user = mongoose.model("user", userSchema)

app.use("/", proRoutes)

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3002, () => console.log("mongo connected")))
  .catch((err) => console.log(err))

// app.listen(3000, () => {
//   console.log("mongo connected")
// })
