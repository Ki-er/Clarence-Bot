const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const blameSchema = new mongoose.Schema({
  reason: reqString,
  date: { type: Date, default: Date.now },
  userId: reqString
})


module.exports = mongoose.model('blame', blameSchema)