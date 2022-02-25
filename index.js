const { Client, Collection } = require("discord.js");
var http = require('http'); http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080);



const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);