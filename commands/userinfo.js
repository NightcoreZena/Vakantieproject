const Discord = require('discord.js');
const Canvas = require('canvas')

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    description: "Skip the currently playing song",
    async execute(message, args) {
        client = message.client;
        if (!args[0]) {
            var user = message.author;
        } else {
            var user = message.mentions.users.first() || client.users.cache.get(args[0])
        }
        var member = message.guild.member(user)

        var loadimagecanvas = "https://i.pinimg.com/originals/72/97/e3/7297e313aa9c47b4e0b4ea3aff6bcaf0.jpg"

        if (user.id === "718827093395243059") loadimagecanvas = "https://coverfiles.alphacoders.com/494/thumb-49483.jpg"

        const canvas = Canvas.createCanvas(500, 200);
        const ctx = canvas.getContext('2d')

        const background = await Canvas.loadImage(loadimagecanvas)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#ffffff'
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#ffffff"
        var size1 = 40;
        var size2 = 30;
        var size3 = 30;

        var name = client.users.cache.get(user.id).tag
        do {
            ctx.font = `${size1 -= 5}px sans-serif`;
        } while (ctx.measureText(name).width > canvas.width - 225)
        ctx.fillText(name, 200, 65)

        var created = "Created:" + user.createdAt.toLocaleString();
        do {
            ctx.font = `${size2 -= 5}px sans-serif`;
        } while (ctx.measureText(created).width > canvas.width - 225)
        ctx.fillText(created, 200, 110)


        var joined = member.joinedAt.toLocaleString();
        do {
            ctx.font = `${size3 -= 5}px sans-serif`;
        } while (ctx.measureText(joined).width > canvas.width - 225)
        ctx.fillText(joined, 200, 145)


        ctx.beginPath();
        ctx.arc(100, 100, 75, 0, Math.PI * 2, true)
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "jpg" }))
        ctx.drawImage(avatar, 25, 25, 150, 150,)

        const final = new Discord.MessageAttachment(canvas.toBuffer(), "userinfo.png")

        return message.channel.send(final)

    }
}