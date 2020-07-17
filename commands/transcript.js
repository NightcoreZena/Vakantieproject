const db = require('quick.db')
const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "transcript",
    async execute(message, args, client) {

        const regex = /(ticket-[0-9]+)/g.test(message.channel.name)
        // Deze lijn is niet percee nodig want als je ooit chat terug wilt lezen kan het ook sneller :p
        //if (regex == false) return message.channel.send(`You need to execute this command in an ticket`)
        if (!message.member.hasPermission("ADMINISTATOR")) return message.channel.send(`You don't have the permissions to execute this command`)
        if (!message.guild.me.hasPermission('ATTACH_FILES')) return message.channel.send(`I don't have permissions to upload files.`)
        const messages = await message.channel.messages.fetch()
        const content = messages.map(m => `${m.createdAt} - ${m.author.tag} - ${m.content}`)
    
        fs.writeFileSync('transcript.txt', content.join('\n'), (error) => {
            if (error) throw error
        })
        message.channel.send(new Discord.MessageAttachment("transcript.txt", "transcript.txt"))

    }
}