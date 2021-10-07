module.exports = {
    name: "addclan",
    description: "Add your Clan!",
    aliases: ["add"],
    owner: false,

    async run(msg, args) {
        if (args[0] === "" || args[0] == null) return await msg.s({ embed: {
                title: 'Please provide me with the clan tag! (Include #)',
                color: "#C0EEFF"
            } });
        await msg.s({ embed: {title: "Checking clan... <a:processing:805142913738080266>" , color: "#C0EEFF"}});
        const clanData = (await msg.client.coc.getClan(args[0])).data;
        if (clanData == null || clanData.reason != null && clanData.reason === "notFound") await msg.s({embed : {title: "Invalid clan tag! <a:oop:805144169181741096>" , color: "#C0EEFF"}});
        else {
            await msg.s({ embed: {
                title: `Hello, I have linked your clan to account ${msg.author.tag}!`,
                color: "#C0EEFF"
            } });
            msg.client.db.set(`${msg.author.id}_clan_tag`, args[0]);

        }
    }
}
