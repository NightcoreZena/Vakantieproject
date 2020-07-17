const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "ticket",
    aliases: ["new"],
    description: "Stops the music",
    async execute(message, args, client) {
        const tickets = new db.table('ticket')
        const regex = /(ticket-[0-9]+)/g.test(message.channel.name)

        var role = message.guild.roles.cache.find(role => role.name === "Support Team");
        if(!args[0]) return message.channel.send(`Please provide a reason.`)
        if (!role) return message.channel.send(`Make an Support Team role with the name \`Support Team\` for ticket support.`)

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`I don't have permissions to create channels.`)
        if (tickets.get(`guild_${message.guild.id}_member_${message.author.id}`) === true) return message.channel.send(`You have already an ticket.`)
        await tickets.add(`guild_${message.guild.id}`, 1)
        tickets.set(`guild_${message.guild.id}_member_${message.author.id}`, true)
        message.guild.channels.create(`ticket-${tickets.get(`guild_${message.guild.id}`)}`, {
            type: "text", 
            permissionOverwrites: [
                {
                    allow: 'VIEW_CHANNEL',
                    id: message.author.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: message.guild.id
                },
                {
                    allow: 'VIEW_CHANNEL',
                    id: role

                }
            ]
        }).then(msg => {
            reason = args.slice(0).join(" ")
            var msgembed = new Discord.MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/attachments/730511638507290806/732693656204607618/concert-ticket-clipart-cliparthut-free-clipart-5qPhuc-clipart.png')
            .setAuthor(`${message.author.tag}'s ticket.`)
            .addField(`Reason: `, `reason`, true)
            .setFooter(`Ticket: ${msg.name}`)
            .addField(`Author:`, `${message.author}`, true)
            .setColor('2f3136')
            msg.send(`${role} will help you soon as possible.`)
            msg.send(msgembed)
        })
    }
}