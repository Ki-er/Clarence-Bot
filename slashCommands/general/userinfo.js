const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Output info about a user.')
        .addUserOption((option) => option
            .setName('user')
            .setDescription("user for information to be outputted.")
            .setRequired(true)),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const user = interaction.options.getUser("user")
        const memberTargetID = user.id
        console.log(memberTargetID)

        const status = memberTargetID.presence.status
        var game = memberTargetID.presence.activities[0] ? memberTargetID.presence.activities[0].name : `User isn't playing a game`

        let status_embed;

        if(status == 'dnd') status_embed = "<:dnd:881522766472441886>" // if the person is dnd  so it will type in the embed Do no Distrub
        if(status == 'online') status_embed = "<:online:881595015875416095>"
        if(status == 'offline') status_embed = "<:offline:881596009069817907>"
        if(status === 'idle') status_embed = "<:idle:881595951419105331>"

        var Account_CreatedAt = memberTargetID.user.createdAt.toString().slice(-55, +24);

        const embed = new discord.MessageEmbed()
            .setTitle(`${status_embed} ${memberTargetID.user.tag}`)
            .setURL(`${memberTargetID.user.avatarURL({dynamic: true})}`)
            .setColor('ORANGE')
            .setFooter({text: `Called By: ${interaction.user.tag}`})              
            .setThumbnail(memberTargetID.user.displayAvatarURL())
            .setTimestamp()
            .addField("Username",`${memberTargetID.user.username}`)
            .addField('Nickname', memberTargetID.nickname ? memberTargetID.nickname : 'User has no nickname')
            .addField("ID",`${memberTargetID.user.id}`)
            .addField('Game', game)
            .addField('Joined at: ',`${memberTargetID.user.joinedAt ? time(memberTargetID.joinedAt, "R") : "Unknown"}}`)
            .addField("Created at: ",`${memberTargetID.user.createdAt ? time(memberTargetID.createdAt, "R") : "Unknown"}`)
            .addField("Account age: ",`${account_age}`)
            .addField("Bot?", `${isBot}`)
            .addField("Avatar URL", `[Link](${memberTargetID.user.avatarURL({dynamic: true})})`, true)
            .addField(`Roles [${memberTargetID.roles.cache.size-1}]`,`${rolemap_size}`)

            interaction.reply({ embeds: [embed] });
    },
}