  
const mongoose = require('mongoose')
const { mongooseConnectionString } = require("./config.json")

module.exports = async () => {
  await mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}