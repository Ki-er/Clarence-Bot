const { Message, Client, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: "pronouns",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("pronouns")
            .setPlaceholder("Select your preferred pronouns")
            .setMinValues(0)
            .setMaxValues(5)
            .addOptions([
            {
                label:"He/Him",
                value:"He",
            },
            {
                label:"She/Her ",
                value:"She",

            },
            {
                label:"They/Them",
                value:"They",
            },
            {
                label:"Any/All Pronouns",
                value:"Any",
            },
            {
                label:"Ask my Pronouns",
                value:"Ask",
            },
        ])
        )

        message.channel.send({content: "Select your prefered pronouns", components:[row]})

    }
}