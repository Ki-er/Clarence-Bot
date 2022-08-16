const { Client, Collection } = require("discord.js");
const mongoose = require('mongoose')
require("dotenv").config();

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);

const mongooseConnectionString = process.env.MONGOOSE

mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Connected to db")



client.login(process.env.DISCORD_TOKEN);