const { Client, Collection } = require("discord.js");
require("dotenv").config();
const mongoose = require('mongoose')

const client = new Client({
    intents: 98819,
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);

// Connect to database
const mongooseConnectionString = process.env.MONGOOSE
mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
console.log("Connected to db")

client.login(process.env.DISCORD_TOKEN);