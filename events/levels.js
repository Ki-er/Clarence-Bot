const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

module.exports = (client) => {
  client.on('message', (message) => {
    if(message.author.bot) return;
    const { guild, member } = message
    if (message.author.id && guild.id) {
      addXP(guild.id, message.author.id, 23, message)
    }
  })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      let { xp, level } = result
      const needed = getNeededXP(level)

      if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
          `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
            level
          )} XP to level up again.`
        )

        await profileSchema.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        )
      }
    } finally {
    }
  })
}

module.exports.addXP = addXP