const db = require('quick.db')

module.exports = {
    name: "bal",
    aliases: ["balance"],
    description: "Pause the currently playing music",
    async execute(message, args, client, formatBytes) {

        let user = message.mentions.users.first() || message.author
        let money = db.fetch(`money_${user.id}`)

        if(money === null) money = 0

        message.channel.send(`${user.tag} you have ${money} :moneybag:`)

    }}