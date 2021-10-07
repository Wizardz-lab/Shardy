module.exports = {
    name: "addalert",
    description: "Add alerts.",
    aliases: ["alertadd","setalert"],
    owner: false,
    async run(msg, args) {
        let targetTag;
        if (args[0] === "" || args[0] == null) return await msg.s("Please provide me with a tag!");
        if (!args[0]) targetTag = COCTag;
        else targetTag = args[0];
        const userData = (await msg.client.coc.getPlayer(targetTag)).data;
        if (userData == null || userData.reason != null && userData.reason === "notFound") await msg.s(authorCOCTag != null ? "No result from the tag! <a:oop:805144169181741096>" : "Did you mean to use clanstats? <a:oop:805144169181741096>");
        else {
            const accs = msg.client.db.get(`${msg.author.id}_alert_tag`);
            if (accs != null) { if (accs.includes(args[0]) == true) return await msg.s("Alert is already on!"); }
            msg.client.db.push(`${msg.author.id}_alert_tag`, args[0]);
            await msg.s("Added the alert!");
            
        }
    }
}