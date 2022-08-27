const { Client, CommandInteraction, Util } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { parse } = require("twemoji-parser");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('jumbo')
        .setDescription('Output a large emoji')
        .addStringOption((option) => option
            .setName('emoji')
            .setDescription("Emoji to be jumbofied")
            .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const inputEmoji = interaction.options.getString('emoji')
        let custom = Util.parseEmoji(inputEmoji);

        if (custom.id) 
        {
            let emoji = (`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
            return interaction.reply(emoji);
        }
        else 
        {
            let parsed = parse(inputEmoji, { assetType: "png" });
            if (!parsed[0]) return interaction.reply("Could not parse emoji");
            return interaction.reply(inputEmoji);
        }

    },
}