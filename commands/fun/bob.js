module.exports = {
	name: 'bob',
	aliases: ['bob'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (message) => {
		message.channel.send({ files: ['./images/bob.png'] });
	},
};
