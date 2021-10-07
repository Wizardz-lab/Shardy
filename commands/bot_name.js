module.exports = {
    name: "bot_name",
    description: "Changes the bot username",
    aliases: ["b_n"],
    usage: "bot_avatar <AVATAR LINK>",
    owner: true,
    async run(msg, args) {
        if (!args[0]) return msg.s("Please send me a name to change my name!");
        try {
            await msg.client.user.setUsername(args.join(" "));
            await msg.s("Successfully changed my name!");
        } catch {
            await msg.s("Something weird happened and I could not change my name!");
        }
    }
}
