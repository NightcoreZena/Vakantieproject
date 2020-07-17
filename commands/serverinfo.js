const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { PREFIX } = require('../config.json')

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

const regions = {
    brazil: ':flag_br: Brazil',
    europe: ':flag_eu: Europe',
    hongkong: ':flag_hk: Hong Kong',
    india: ':flag-in: India',
    japan: ':flag_jp: Japan',
    russia: ':flag_ru: Russia',
    singapore: ':flag_sg: Singapore',
    southafrica: ':flag_za: South Africa',
    sydney: ':flag_hm: Sydney',
    ':flag_us: us-central': ':flag_us: US Central',
    ':flag_us: us-east': ':flag_us: US East',
    ':flag_us: us-west': ':flag_us: US West',
    ':flag_us: us-south': ':flag_us: US South'
};

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    description: "Shuffle queue",
    async execute(message) {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setAuthor(`Server Information | ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setColor('ORANGE')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(`Server ID`, message.guild.id, true)
            .addField(`Server Owner`, `${message.guild.owner.user.tag}\n${message.guild.owner}`, true)
            .addField(`Server Region`, regions[message.guild.region], true)
            .addField(`Server Nitro`, `Tier ${message.guild.premiumTier}` || 'None', true)
            .addField(`Channels`, `Text: ${channels.filter(channel => channel.type === 'text').size}\nVoice: ${channels.filter(channel => channel.type === 'voice').size}`, true)
            .addField(`Member Count`, `Total: ${message.guild.memberCount}\nHumans: ${members.filter(member => !member.user.bot).size}\nBots: ${members.filter(member => member.user.bot).size}`, true)
            .addField(`Verification Level`, verificationLevels[message.guild.verificationLevel], true)
            .addField(`Server Prefix`, PREFIX, true)
            .addField(`Status List`, `<:9166_online:731918627137388674> ${members.filter(member => member.presence.status === 'online').size} | <:2834_Idle:731918603628052488> ${members.filter(member => member.presence.status === 'idle').size} | <:2531_dnd:731918593452802098> ${members.filter(member => member.presence.status === 'dnd').size} | <:9819_Offline:731918635119018044> ${members.filter(member => member.presence.status === 'offline').size} | <:7389_streaming:731918616064426054> ${members.filter(member => member.presence.status === 'streaming').size}`)
            .addField(`Creation Date`, `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} \n(${moment(message.guild.createdTimestamp).fromNow()})`)
            .addField(`Roles [${roles.length - 1}]`, roles.length < 30 ? roles.join(', ') : roles.length > 31 ? "This guild has to many roles..." : "This guild has to many roles...")
        message.channel.send(embed);
    }
}