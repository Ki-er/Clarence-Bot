const { Client, Collection } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: 98819,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);

client.login(process.env.DISCORD_TOKEN);