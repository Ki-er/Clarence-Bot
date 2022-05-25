const mongoose = require('mongoose')
require("dotenv").config();
const mongooseConnectionString = process.env.MONGOOSE

module.exports = async () => {
  await mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}