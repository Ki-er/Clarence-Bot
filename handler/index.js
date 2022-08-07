const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);


/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
        commandFiles.map((value) => {
            console.log(`Load Command: ${value}`)
            const file = require(value);
            const splitted = value.split("/");
            const directory = splitted[splitted.length - 2];
    
            if (file.name) {
                const properties = { directory, ...file };
                client.commands.set(file.name, properties);
            }
        });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    for(const filepath of eventFiles) {
        eventFiles.map((value) => require(value));
        console.log(`Load Event: ${filepath}`)
    }

    // Slash Commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const arrayOfSlashCommands = [];
        slashCommands.map((value) => {
            console.log(`Load Slash Command: ${value}`)
            const file = require(value);
            if (!file?.name) return;
            client.slashCommands.set(file.name, file);
        
            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayOfSlashCommands.push(file);
        })
    

    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);
        console.log("Slash commands registered!")
    });
};