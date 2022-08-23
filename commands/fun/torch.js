const discord = require("discord.js");

module.exports = {
    name: "lampadaferens",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send('https://th.bing.com/th/id/R.b938157fa7b152a1109aede2091f6b72?rik=%2f3u0RlNpTY1JDw&pid=ImgRaw&r=0')
    },
};