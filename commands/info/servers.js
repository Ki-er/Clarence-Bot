module.exports = {
	name: 'servers',
	aliases: [''],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(
				`${guild.name} has a total of ${guild.memberCount} members`
			);
		});
	},
};
