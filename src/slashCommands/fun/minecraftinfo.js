const axios = require(`axios`);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const minecraftData = require('minecraft-data');
const mcData = minecraftData('1.19');
const mcAssets=require("minecraft-assets")("1.18.1")

module.exports = {
	...new SlashCommandBuilder()
		.setName('minecraftinfo')
		.setDescription('Get info about block from Minecraft')
		.addStringOption(option =>
			option.setName('block')
				.setDescription('Name of block')
				.setRequired(true)),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const blockName = interaction.options.getString('block').toLowerCase();
		const blockNameRightShape = blockName.split(' ').join('_');
		const blockInfo = mcData.blocksByName[blockNameRightShape];

		if (blockInfo) { // block was found
			let textureUrl = '';
			let isTextureAvailable = false;
			try{
				textureUrl = ("https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.18.1/"+mcAssets.getTexture(blockInfo.name)+".png");
				textureUrl = textureUrl.replace('minecraft:block', 'blocks');
				await axios({ // find out if texture is available
					method: 'get',
					url: textureUrl,
				})
					.then((response) => {
						if (response.status === 200){
							isTextureAvailable = true;
						} else {
							isTextureAvailable = false;
						}
					})
					.catch(() => {
						isTextureAvailable = false;
					});
			}
			catch(err){
			}
			
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setFooter({
					text: `Called By: ${interaction.user.tag}`,
				})
				.setAuthor({ name: blockInfo.displayName, iconURL: isTextureAvailable ? textureUrl : null })
				.setTimestamp()
				.addFields(
					{ name: 'Stack Size', value: `${blockInfo.stackSize}` },
					{ name: 'Diggable', value: blockInfo.diggable ? 'Yes' : 'No', inline: true },
					{ name: 'Hardness', value: `${blockInfo.hardness}`, inline: true },
					{ name: 'Transparent', value: blockInfo.transparent ? 'Yes' : 'No' },
					{ name: 'Emit Light', value: `${blockInfo.emitLight}`, inline: true },
					{ name: 'Filter Light', value: `${blockInfo.filterLight}`, inline: true },
				)

			interaction.reply({ embeds: [embed] });
		} else { // when block is not found
			const embed = new MessageEmbed()
				.setColor('RED')
				.setFooter({
					text: `Called By: ${interaction.user.tag}`,
				})
				.setTimestamp()
				.setTitle('Minecraft Info')
				.setDescription('Block not found! Please insert another name.');
			interaction.reply({ embeds: [embed] });
		}
	},
};
