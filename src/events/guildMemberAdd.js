const client = require('../index');
const guildSchema = require('../schemas/guild-schema');

client.on('guildMemberAdd', async (guildmember) => {
	const data = await guildSchema.findById(guildmember.guild.id);
	if (!data) return;
	const welcomechannel = guildmember.guild.channels.cache.get(
		data.welcomeChannelId
	);

	welcomechannel.send({
		content: `<:hi:858281121611513897> Welcome! **${guildmember.user}** has just joined the server!`,
	});
});
