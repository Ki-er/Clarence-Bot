const { Client, Collection } = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');

const client = new Client({
	intents: 98819,
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require('./handler')(client);

// Connect to database
const mongooseConnectionString = process.env.MONGOOSE;

mongoose.set('strictQuery', false);

mongoose
	.connect(mongooseConnectionString)
	.then(() => {
		console.log('Connected to db');
	})
	.catch((err) => {
		console.log('Error occurred:', err);
	});

client.login(process.env.DISCORD_TOKEN);

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (!message.guild) return;
});
