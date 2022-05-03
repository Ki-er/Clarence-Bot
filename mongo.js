const config = require("./config.json");
const mongoose = require('mongoose')
const mongooseConnectionString = config.mongooseConnectionString

module.exports = async () => {
  await mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}