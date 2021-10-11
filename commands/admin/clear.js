const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['purge', 'delete'],

    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.ADMINISTRATOR)) // sets the perm.
        return message.reply(
            `You do not have correct permissions to do this action, ${message.author.username}` // return this msg if the user dont hv perm
        );
   
    if (!args[0]) {
        return message.reply(`Please enter a amount between 1 to 100`) // of he didnt provide a number to delete send this
    }
    
    let int = args[0];
    if (int > 100) int = 100;

    try {
        await message.delete()
        const fetch = await message.channel.messages.fetch({ limit: int });
        const deletedMessages = await message.channel.bulkDelete(fetch, true);

        const results = {};
        for (const [, deleted] of deletedMessages) {
            const user = `${deleted.author.username}#${deleted.author.discriminator}`;
            if (!results[user]) results[user] = 0;
            results[user]++;
        }

        const userMessageMap = Object.entries(results);

        const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}** : ${messages}`).join('\n')}`;
        await message.channel.send({ content: finalResult }).then(async (msg) => setTimeout(() => msg.delete(), 1000))
    } catch (err) {
        if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
    }
}
}
