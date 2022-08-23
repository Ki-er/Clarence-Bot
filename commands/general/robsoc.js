const discord = require("discord.js");

module.exports = {
    name: "robotics",
    aliases: ['robsoc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new discord.MessageEmbed()
        .setTitle("Robotics Society")
        .setColor('BLUE')
        .setFooter({ text: `Called By: ${message.author.tag}`}) 
        .setDescription('Robotics Society aee a society where you can gain skills in building an actual robot, or get help with your assignments or exams, but they also run social night where they go out to do stuff.')
        .addField('You can join them from below!','https://discord.gg/cMP5CavnK4')
        message.channel.send({ embeds: [embed] });
    }
}