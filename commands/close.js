const db = require('quick.db')

module.exports = {
    name: "close",
    async execute(message, args) {

        const tickets = new db.table('ticket')
        const regex = /(ticket-[0-9]+)/g.test(message.channel.name)


        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`I don't have permissions to create channels.`)
        if (!tickets.get(`guild_${message.guild.id}_member_${message.author.id}`) == null) return message.channel.send(`You don't have an open ticket.`)
        if (regex == false) return message.channel.send(`You need to do this in a ticket.`)
        await tickets.delete(`guild_${message.guild.id}_member_${message.author.id}`)
        message.channel.delete()

    }
}