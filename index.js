const { Client, Collection } = require("discord.js");
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

client.on('ready', () => {
    console.log('Clarence is online')
    client.user.setActivity(`-help`, {type:"WATCHING"})
})


client.login(process.env.DISCORD_TOKEN);