const db = require('quick.db')
const ms = require('parse-ms')
const discord = require('discord.js')

let timeout = 84600000
let amount = Math.floor(Math.random() * 300) + 1
module.exports = {
    name: "daily",
    description: "Pause the currently playing music",
    async execute(message, args, client, formatBytes) {

        let daily = await db.fetch(`daily_${message.author.id}`);

        if (daily != null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            message.channel.send(`You already claimed your daily reward today, Come back in \`${time.hours}\`h, \`${time.minutes}\`m, \`${time.seconds}\`s.`)
        } else {
            let embed = new discord.MessageEmbed()
                .setAuthor(`Daily reward`, message.author.displayAvatarURL())
                .setDescription(`You claimed today: **${amount}**!`)
                .setColor('2f3136')
            message.channel.send(embed)

            db.add(`money_${message.author.id}`, amount)
            db.add(`daily_${message.author.id}`, Date.now())
        }
    }
}