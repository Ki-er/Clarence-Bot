module.exports = {
	name: 'bob',
	aliases: ['bob'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		message.channel.send({ files: ['./images/bob.png'] });
	},
};
