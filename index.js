const Discord = require('discord.js-light'),
    client = new Discord.Client(),
    quick = require('quick.db-plus'),
    config = require('./config.json'),
    loadCommands = require("./startup/loadCommands"),
    coc = require('./utility/coc');

client.coc = new coc(config.coc_token[0]);
client.config = config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = new quick.db("Bot");


require('./startup/message')();

client.on("ready", () => {
    console.log("Ready!");
    loadCommands(client);
	client.user.setActivity('-help', { type: "WATCHING" });
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    let prefix = client.config.prefix;
    if (!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    let args = msg.content.slice(prefix.length).split(" "),
        commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;   
    if (command.name != "register" && command.name != "addclan" && msg.channel.type == "dm") return await msg.s("This command cannot be run in a DM.");
    if (command.owner) {
        if (!client.config.ownerID.includes(msg.author.id)) return;
    }
    try {
        await msg.s({ embed: {description: "Processing... <a:processing:805142913738080266>"}})
        command.run(msg, args);
    } catch (e) {
        console.log(e)
    }
})

client.login(config.token).then();
