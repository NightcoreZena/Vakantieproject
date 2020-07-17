/**
 * Module Imports
 */
const Discord = require("discord.js");
const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { readdirSync } = require("fs");
const { join } = require("path");
const { PREFIX } = require("./config.json");
const db = require('quick.db');

const client = new Discord.Client({ disableMentions: "everyone" });

client.login(process.env.TOKEN);
client.commands = new Discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Discord.Collection();


/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help`);
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    xp(message)
    if (message.content.startsWith(`${PREFIX}rank`)) {
      var user = message.mentions.users.first() || message.author;
      //https://i.pinimg.com/originals/89/5c/cc/895cccce862751373e5b14dc11e3bbd7.jpg
      var defaultbackground = "https://i.pinimg.com/originals/72/97/e3/7297e313aa9c47b4e0b4ea3aff6bcaf0.jpg"
      var defaultcolor = "white"
      //Pleun
      if (user.id === "718827093395243059") defaultbackground = "https://img.freepik.com/free-vector/gradient-geometric-shape-background_78532-374.jpg?size=626&ext=jpg"
      //Stefano
      if (user.id === "725839886246084699") defaultbackground = "https://cdn.discordapp.com/attachments/694695166015176734/733302630830309426/tenor_3.gif"
      if (user.id === "725839886246084699") defaultcolor = "#22F1F1"
      //Victiny
      if (user.id === "394112984001282049") defaultbackground = "https://cdn.discordapp.com/attachments/694695166015176734/733298061429702696/aww__why_are_you_blushing__by_xgeez-d5watul.png"
      if (user.id === "394112984001282049") defaultcolor = "#FF7400"
      //
      var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0
      level = level.toString()
      let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0
      var xpNeeded = level * 500 + 500
      let every = db
        .all()
        .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
        .sort((a, b) => b.data - a.data)
      var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${user.id}`)
      rank = rank.toString()
      var image = await canvas.rank({
        username: user.username,
        discrim: user.discriminator,
        status: user.presence.status,
        currentXP: xp.toString(),
        neededXP: xpNeeded.toString(),
        rank,
        level,
        avatarURL: user.displayAvatarURL({ format: 'jpg' }),
        background: defaultbackground,
        color: defaultcolor
      })
      return message.channel.send(new Discord.MessageAttachment(image, "rank.png"))
    }

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.").catch(console.error);
    }
  }

});

function xp(message) {
  if (!message.content.startsWith(PREFIX)) return;
  const randomNumber = Math.floor(Math.random() * 10) + 15
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
  db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
  var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
  var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
  var xpNeeded = level * 500
  if (xpNeeded < xp) {
    var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
    message.channel.send(`GG ${message.author}, you just advanced to level ${newLevel}!`)
  }

}
