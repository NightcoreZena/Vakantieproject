const { MessageEmbed } = require("discord.js");
const { PREFIX } = require('../config.json')

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Display all commands and descriptions",
    execute(message, args, client) {

        var embed = new MessageEmbed()
        .setAuthor(`Help menu | ${message.client.user.tag}`)
        .setColor('2f3136')
        .setThumbnail(message.client.user.displayAvatarURL())
        .addField(`📚 | Member`, `\`${PREFIX}help member\``)
        .addField(`🎵 | Music`, `\`${PREFIX}help music\``)
        .addField(`💰 | Economy`, `\`${PREFIX}help economy\``)
        .addField(`🛠️ | Moderation`, `\`${PREFIX}help moderation\``)
        .addField(`📑 | Support`, `\`${PREFIX}help support\``)
        message.channel.send(embed)

    }
};