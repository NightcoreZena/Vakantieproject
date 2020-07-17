const db = require('quick.db')
const ms = require('parse-ms')
const discord = require('discord.js')



module.exports = {
    name: "work",
    description: "Remove song from the queue",
    async execute(message, args, client) {

        let timeout = 3600000
        let worked = await db.fetch(`worked_${message.author.id}`)

        if (worked != null && timeout - (Date.now() - worked) > 0) {
            let time = ms(timeout - (Date.now() - worked));
            message.channel.send(`You have already worked, Come back in \`${time.hours}\`h, \`${time.minutes}\`m, \`${time.seconds}\`s.`)
        } else {
            let jobs = ["Developer", "Scientist", "Shopkeeper", "Doctor"]
            let job = jobs[Math.floor(Math.random() * jobs.length)]

            let amount = Math.floor(Math.random() * 140) + 1

            let embed = new discord.MessageEmbed()
            .setAuthor(`${message.author.tag}, it payed off.`, message.author.displayAvatarURL())
            .setDescription(`${message.author}, you worked as a ${job} and earnt ${amount}`)
            .setColor('2f3136')

            message.channel.send(embed)

            db.add(`money_${message.author.id}`, amount)
            db.add(`worked_${message.author.id}`, Date.now())


        }
    }
};