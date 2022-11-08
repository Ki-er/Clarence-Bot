const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { glob } = require('glob');
const { readdirSync, statSync } = require('node:fs');
const { promisify } = require('util');

module.exports = {
	...new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays command info'),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		//NOTE Getting arrayOfDirs - List of dir names / command topics
		const path = `${process.cwd()}/src/slashCommands`;
		const arrayOfDirs = readdirSync(path).filter(function (file) {
			return statSync(path + '/' + file).isDirectory();
		});

		var topics = [];
		for (const dir of arrayOfDirs) {
			//NOTE For every topic do..

			let text = '';

			//NOTE Get arrayOfSlashCommands for specific topic
			const globPromise = promisify(glob);
			const slashCommands = await globPromise(
				`${process.cwd()}/src/slashCommands/${dir}/*.js`
			);
			const arrayOfSlashCommands = [];
			slashCommands.map((value) => {
				const file = require(value);
				if (!file?.name) return;
				client.slashCommands.set(file.name, file);
				if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
				arrayOfSlashCommands.push(file);
			});

			//NOTE Add every command name and description to text value.
			arrayOfSlashCommands.forEach((command) => {
				text += `/${command.name} - ${command.description}\n`;
			});

			topics.push({
				name: enhancedTopic(dir), //NOTE Enchant topic name
				value: `${text}`,
				inline: true,
			});

			if (topics.length % 3 == 2)
				//NOTE - To make only 2 rows - every third is empty
				topics.push({
					name: '\u200b',
					value: '\u200b',
					inline: false,
				});
		}

		//NOTE make embed with fields
		const embed = new MessageEmbed()
			.setTitle(`Help`)
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setTimestamp()
			.setDescription(`List of commands`)
			.addFields(topics);

		interaction.reply({ embeds: [embed] });
	},
};

//NOTE enhancedTopic name
function enhancedTopic(name) {
	switch (name) {
		case 'moderation':
			return 'Admin ⚒️';
		case 'general':
			return 'General 📖';
		case 'debugging':
			return 'Debugging ℹ';
		case 'siege':
			return 'Siege 🔫';
		case 'fun':
			return 'Fun 🎉';
		default:
			return name;
	}
}
