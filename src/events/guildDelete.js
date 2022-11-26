const client = require('../index');
const guildData = require('../schemas/guild-schema');

client.on('guildDelete', async (guild) => {
    guildData.find().then((data) => {
        if (!data) return;

        data.forEach(async (record) => {

            if(record.id == guild.id)
            {
                await guildData.deleteOne({ _id: guild.id })
                console.log(`Deleted ${guild.name} from the database`)
            }
        });
    });
});
