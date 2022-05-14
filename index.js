const config = require("./config.json"); 
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


var express = require('express');
var app = express(); // here I use the express() method, instead of the createServer()


app.get('/ping', (req, res) => {
    console.info('Server was pinged');
    res.send('Hello World');
});

var server = app.listen(3003, function() {
    console.log('HullCSS is online')
    console.log('Listening on port %d', server.address().port);
});
client.login(config.token);