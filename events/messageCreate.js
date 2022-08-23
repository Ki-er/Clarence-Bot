const client = require("../index");
require("dotenv").config();
const discord = require('discord.js');



client.on("messageCreate", async (message) => {
    if(message.channel.id == "427867128847138816")
    {
        const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId('CloseThread')
            .setEmoji('<:archive:937932140014866492> ')
            .setLabel('Archive Thread')
            .setStyle('SUCCESS')
        )

        const thread = message.startThread({
            name: `${message.author.tag} - ${message}`,
            autoArchiveDuration: 60,
            type: 'GUILD_PUBLIC_THREAD'
        });

        (await thread).send({
            content: `Hey <@${message.author.id}>! I've automatically created this thread from your message to keep the channel clean and keep messages condensed. 
                \nIt is recommended that you change the Notification Settings for this thread to All Messages so that you get a notification when someone has responded to your query.
                \nFeel free to ping '@Coursework Help if you would like a hand!`,
            components: [row]
        });

        (await thread).leave();
    }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(process.env.PREFIX)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(process.env.PREFIX.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
    
});