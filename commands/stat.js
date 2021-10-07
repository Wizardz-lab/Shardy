module.exports = {
    name: "stat",
    description: "View yours/other clash of clans stat",
    aliases: ["status","stats"],
    owner: false,
    async run(msg, args) {
        const authorCOCTag = msg.client.db.get(`${msg.author.id}_coc_tag`);
        let targetTag;
        if (args[0] === "" || args[0] == null && authorCOCTag == null) return await msg.s("Please provide me with a tag!");
        if (!args[0]) targetTag = authorCOCTag;
        else targetTag = args[0];
        const userData = (await msg.client.coc.getPlayer(targetTag)).data;
        if (userData == null || userData.reason != null && userData.reason === "notFound") await msg.s(authorCOCTag != null ? "No result from the tag! <a:oop:805144169181741096>" : "Did you mean to use clanstats? <a:oop:805144169181741096>");
        else {
            let clanstats = userData.clan
            if (clanstats === "" || clanstats == null || clanstats == undefined){ clanstats = "No clan found!" }
            let embed = {
                fields: [                
                { name: 'Town Hall level: ', value: userData.townHallLevel },
                { name: 'XP level: ', value: userData.expLevel },
                { name: 'Trophies Gained: ', value: userData.trophies },
                { name: 'Battles won(vs): ', value: userData.versusBattleWinCount },
                { name: 'Clan: ', value: clanstats },
                ],
                title: `Stats for ${userData.name}${userData.tag}`,
                color: "#C0EEFF"
            };
            await msg.s({ embed: embed });
        }
    }
}
