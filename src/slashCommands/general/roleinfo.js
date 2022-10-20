const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('roleinfo')
		.setDescription('Output role information')
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription('Role you want info for')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const role = interaction.options.getRole('role');
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.setFooter(
				interaction.guild.name,
				interaction.guild.iconURL({ dynamic: true })
			)
			.addFields(
				{
					name: 'Role Name:',
					value: role.name,
				},
				{
					name: 'Role ID:',
					value: role.id,
				},
				{
					name: 'Role Color:',
					value: `${role.hexColor}`,
				},
				{
					name: 'Hosted?',
					value: role.hoist.toString(),
				},
				{
					name: 'Role Position:',
					value: role.position.toString(),
				},
				{
					name: 'Role Managed?',
					value: role.managed.toString(),
				},
				{
					name: 'Role Created At:',
					value: `${role.createdAt ? time(role.createdAt, 'R') : 'Unknown'}`,
				}
			);
		if (role.icon) {
			embed.addField(
				'Role Icon:',
				`[Icon URL](${role.iconURL({ size: 4096, format: 'png' })})`
			);
			embed.setThumbnail(role.iconURL({ size: 4096, format: 'png' }));
			embed.setAuthor(role.name, role.iconURL({ size: 4096, format: 'png' }));
		}
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('perms')
				.setLabel('Role Permissions')
				.setStyle('PRIMARY')
		);
		interaction.reply({ embeds: [embed], components: [row] });
		const filter = (i) =>
			i.customId === 'perms' ||
			('members' && i.user.id === interaction.user.id);
		const collector = interaction.channel.createMessageComponentCollector({
			filter,
		});
		collector.on('collect', async (i) => {
			if (i.customId === 'perms') {
				await i.deferReply();
				const rolePerms = role.permissions.toArray().join('\n');
				return await i.editReply({
					content: `**${role.name} Role Permissions:**\`\`\`\n${rolePerms}\`\`\``,
					embeds: [],
					components: [],
				});
			}
		});
	},
};
