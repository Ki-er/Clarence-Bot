const { Message, Client, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: "games",
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
            .setCustomId("games")
            .setPlaceholder("Select some games")
            .setMinValues(0)
            .setMaxValues(2)
            .addOptions([{
                    label:"Rainbow Six Siege",
                    value:"R6",
                    id:"R6"
            },
            {
                label:"Minecraft",
                value:"gameMinecraft",
                id:"gameMinecraft"

            },
        ])


        )

        message.channel.send({content: "Select some games (You need the role to see it)", components:[row]})


    },
};
