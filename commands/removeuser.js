const db = require('quick.db')

module.exports = {
    name: "removeuser",
    async execute(message, args, client) {

        const tickets = new db.table('ticket')
        const regex = /(ticket-[0-9]+)/g.test(message.channel.name)
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I don't have permissions to manage channels.`)
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You don't have permissions to execute this command.`)
        if (!mentionedMember) return message.channel.send(`You need to mention a member or pick the id from member you want to remove from the ticket.`)
        if (regex == false) return message.channel.send(`You need to execute this command in a ticket.`)
        message.channel.updateOverwrite(mentionedMember.id, { VIEW_CHANNEL: false })
        return message.channel.send(`Removed ${mentionedMember.user.tag} from the ticket.`)

    }
}