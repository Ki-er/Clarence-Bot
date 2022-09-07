const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const guildSchema = new mongoose.Schema({
    Guild: reqString,
    WelcomeChannel: reqString,
    SuggestionChannel: String,
})


module.exports = mongoose.model('guild', guildSchema)