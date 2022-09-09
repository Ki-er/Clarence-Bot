const { Permissions } = require('discord.js');

module.exports = {
	name: 'unban',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const bannedMember = args[0];
		if (
			!message.member.permissions.has(
				Permissions.FLAGS.BAN_MEMBERS,
				Permissions.FLAGS.ADMINISTRATOR
			)
		)
			return message.reply("You don't have permission to use that command.");
		if (!args[0]) return message.reply('Provide me a valid USER ID.');
		if (bannedMember == message.author.id)
			return message.reply('You cant unban yourself!');

		message.guild.members.unban(bannedMember);
		message.channel.send(`${bannedMember.tag} has been unbanned.`);
	},
};
