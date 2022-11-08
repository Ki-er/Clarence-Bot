const { Client, Collection } = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');
const Levels = require('discord-xp');



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

Levels.setURL(mongooseConnectionString);

let isXpSystemOn = true;

mongoose
	.connect(mongooseConnectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to db');
	})
	.catch((err) => {
		console.log('Error occurred:', err);
	});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async(message) => {
    if(message.author.bot) return;
    if(!message.guild) return;

	if (isXpSystemOn == true){
		const randomXP = Math.floor(Math.random() * 10) + 1;
		const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
		console.log(`${message.author.id} recieved ${randomXP} xp!\n`);
		if(hasLevelUp){
			const user = await Levels.fetch(message.author.id, message.guild.id);
			message.channel.send(`You have reached new level! Congratulations! ${user.level}`); 
		}
	}

});

client.on("onToggleXp", isOn => {
	isXpSystemOn = isOn;
});
