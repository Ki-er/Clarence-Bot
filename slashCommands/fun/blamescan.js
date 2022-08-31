const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { count } = require("node:console");
const blames = require('../../schemas/blamestitch-schema');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "blamescan",
    description: "Scan blames",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const blame = await blames.find({});
        await interaction.deferReply()
        await wait(3000)
        await interaction.editReply(`Stitch has been blamed ${19 + blame.length} times.\r\nThere were 19 blames before the database.\r\nGetting all database blames, this may take a while.`)

        let counter = 0
        for(let i = 0; i < blame.length; ++i) 
        {
            if(counter == blame.length)
            {
                break;
            }

            const embed = new MessageEmbed()
            for(let j = 0; j < 10; ++j) 
            {
                if(counter == blame.length)
                {
                    break;
                }

                embed.setColor('ORANGE')
                embed.setFooter({ text: `Called By: ${interaction.user.tag}`})                   
                embed.setTimestamp()
                embed.addField(`Blame Number: ${[counter+1]}`, 
                `Reason: ${blame[counter].reason}
                Date: ${blame[counter].date.toLocaleDateString("en-UK")}
                Added by: <@${blame[counter].userId}>`)
                ++counter
            }
                interaction.channel.send({ embeds: [embed] });
            }
        }
    
};