const axios = require('axios')
module.exports = {
    name: "bot_avatar",
    description: "Changes the bot's avatar",
    aliases: ["b_av"],
    usage: "bot_avatar <AVATAR LINK>",
    owner: true,
    async run(msg, args) {
        if (!args[0]) return msg.s("Please send me a valid link to change my avatar!");
        try {
            const res = await axios.get(args[0], { responseType: 'arraybuffer' })
            await msg.client.user.setAvatar(res.data);
            await msg.s("Successfully changed my avatar!");
        } catch {
            await msg.s("Something weird happened and I could not change my avatar!");
        }
    }
}
