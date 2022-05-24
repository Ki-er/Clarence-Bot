const { Client, Collection } = require("discord.js");



const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
//client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.on('ready', () => {
    console.log('Clarence is online')
    client.user.setActivity(`-help`, {type:"WATCHING"})
    levels(client)
})


client.login(process.env.DISCORD_TOKEN);