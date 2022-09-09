const client = require('../index');
const guildSchema = require('../schemas/guild-schema');

client.on('guildMemberRemove', async (guildmember) => {
	const data = await guildSchema.findById(guildmember.guild.id);
	if (!data) return;
	const welcomechannel = guildmember.guild.channels.cache.get(
		data.welcomeChannelId
	);

	welcomechannel.send({
		content: `<:bye:875359507503546438> Goodbye **${guildmember.user.tag}** has just left server!`,
	});
});
