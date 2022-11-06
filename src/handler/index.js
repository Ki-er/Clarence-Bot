const { glob } = require('glob');
const { promisify } = require('util');

const globPromise = promisify(glob);
const user = require('../schemas/user-schema');


/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Commands
	const commandFiles = await globPromise(
		`${process.cwd()}/src/commands/**/*.js`
	);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split('/');
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	});

	// Events
	const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/src/slashCommands/*/*.js`
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on('ready', async () => {
		// Register for all the guilds the bot is in
		await client.application.commands.set(arrayOfSlashCommands);
	});

	client.on('guildMemberAdd', async (guildMember) => {
		await user.create({
			_id: guildMember.user.id,
			date: new Date(),
		});
	})
};
