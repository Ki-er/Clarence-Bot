const { Util } = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = {
	name: 'jumbo',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		let emoji = args[0];
		if (!emoji) return message.channel.send('No emoji provided!');

		const custom = Util.parseEmoji(emoji);

		if (custom.id) {
			emoji = `https://cdn.discordapp.com/emojis/${custom.id}.${
				custom.animated ? 'gif' : 'png'
			}`;
			return message.channel.send(emoji);
		}
		const parsed = parse(emoji, { assetType: 'png' });
		if (!parsed[0]) return message.channel.send('Invalid emoji!');
		return message.channel.send(emoji);
	},
};
