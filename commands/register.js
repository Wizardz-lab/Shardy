module.exports = {
    name: "register",
    description: "Register your clash of clans(tm) account",
    aliases: [],
    owner: false,

    async run(msg, args) {
        if (msg.channel.type != 'dm') return await msg.s({ embed: {
                title: 'Please run me in a DM',
                color: "#C0EEFF"
        }});
        if (args[0] === "" || args[0] == null) return await msg.s({ embed: {
                title: 'Please provide me with your tag! (Include #)',
                color: "#C0EEFF"
            } });
        await msg.s({ embed: {title: "Checking player account... <a:processing:805142913738080266>" , color: "#C0EEFF"}});
        const userData = (await msg.client.coc.getPlayer(args[0])).data;
        if (userData == null || userData.reason != null && userData.reason === "notFound") await msg.s({embed : {title: "Invalid account tag! <a:oop:805144169181741096>" , color: "#C0EEFF"}});
        else {

            const accs = msg.client.db.get(`${msg.author.id}_coc_tag`);
            if (accs && accs.includes(args[0]) == true) return await msg.s({embed: {title: "Account already linked!",color: "#C0EEFF"}}); 
            msg.client.db.push(`${msg.author.id}_coc_tag`, args[0]);
            await msg.s({ embed: {
                title: `Hello, ${userData.name}!\nI have linked your account!`,
                color: "#C0EEFF"
            } });

        }
    }
}
