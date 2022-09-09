const { Permissions } = require('discord.js');

module.exports = {
	name: 'ban',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (message, args) => {
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		if (
			!message.member.permissions.has(
				Permissions.FLAGS.BAN_MEMBERS,
				Permissions.FLAGS.ADMINISTRATOR
			)
		)
			return message.reply("You don't have permission to use that command.");
		if (!args[0])
			return message.reply({ content: `Please specify a user to ban` });
		if (member.id == message.author.id)
			return message.reply('You cant ban yourself!');

		return (
			(await member.ban()) +
			message.reply({ content: `User ${member} has been banned` })
		);
	},
};
