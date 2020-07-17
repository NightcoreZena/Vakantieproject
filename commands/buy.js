const db = require('quick.db')
const discord = require('discord.js')


module.exports = {
    name: "buy",
    description: "Buy an item.",
    async execute(message, args, client) {

        let author = db.fetch(`money_${message.author.id}`)

        if(!args[0]) {
            var itemsembed = new discord.MessageEmbed()
            .setTitle(`All things you can buy`)            
            .setColor('2f3136')
            .setDescription(`\n**Sword** | $50\n**VR-Headset** | $300`)
            message.channel.send(itemsembed)
        }

        if(args[0] === "sword") {
            if (author < 50) {
                message.channel.send(`You have not enough money to buy this.`)
            } else {
                let items = db.fetch(message.author.id, { items: [] })
                db.push(message.author.id, "Sword")
                message.channel.send(`You have bought an Sword`)
                db.subtract(`money_${message.author.id}`, 50)
            }  
        } else if (args[0] === "vr-headset") {
            if (author < 300) {
                message.channel.send(`You have not enough money to buy this.`)
            } else {
                let items = db.fetch(message.author.id, { items: [] })
                db.push(message.author.id, "VR-Headset")
                message.channel.send(`You have bought an VR-Headset`)
                db.subtract(`money_${message.author.id}`, 300)
            }
        }

    }
};