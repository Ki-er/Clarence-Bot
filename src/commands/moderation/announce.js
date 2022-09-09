const { Permissions } = require('discord.js');

module.exports = {
	name: 'announcement',
	aliases: ['announce'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	run: async (client, message, args) => {
		if (message.guild && message.guild.id === '744586833135927366') {
			if (
				!message.member.permissions.has(
					Permissions.FLAGS.BAN_MEMBERS,
					Permissions.FLAGS.ADMINISTRATOR
				)
			) {
				message.channel.send("You don't have permission to use that command.");
			} else {
				const announceChannel = client.channels.cache.get('845386604067029054');
				const messageArgs = args.join(' ');

				announceChannel.send(messageArgs).catch((err) => {
					throw err;
				});
				message.channel.send(
					'Your announcement has been sent to: <#845386604067029054>'
				);
			}
		} else {
			message.reply('That is not available within this server');
		}
	},
};
