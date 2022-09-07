const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const guildSchema = new mongoose.Schema({
    _id: reqString,
    welcomeChannelId: reqString,
    suggestionChannelId: String,
})

module.exports = mongoose.model('guild', guildSchema)