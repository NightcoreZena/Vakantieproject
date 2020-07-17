const db = require('quick.db')
const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "inventory",
    aliases: ['inv', 'invsee'],
    description: "Remove song from the queue",
    async execute(message, args, client) {

        let items = db.get(message.author.id)
        let user = message.author
        let money = db.get(`money_${user.id}`)
        if(money === null) money = 0
        if(items === null) items = "This user has nothing."

        let embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Inventory`)
        .setDescription(`Balance: ${money} :moneybag:`)
        .addField(`Inventory`, items)
        .setColor('2f3136')

        message.channel.send(embed)

    }
};