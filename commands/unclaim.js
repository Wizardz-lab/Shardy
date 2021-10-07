module.exports = {
    name: "unclaim",
    description: "Unclaim a claimed base!",
    aliases: [],
    owner: false,
    async run(msg, args) {
       const authorCOCTag = msg.client.db.get(`${msg.author.id}_clan_tag`);
        let targetTag;
        if (authorCOCTag == null) return await msg.s("Please link a clan tag first!");
        if (args[0] === "" || args[0] == null) return await msg.s("Please provide me with a map location number (use -war to find it)! <a:oop:805144169181741096>");
        targetTag = authorCOCTag;
        let userData = (await msg.client.coc.getClanCurrentWar(targetTag));
        const clanData = (await msg.client.coc.getClan(targetTag)).data;
        if (clanData == null || clanData.reason != null && clanData.reason === "notFound") return await msg.s({embed : {title: "Invalid clan tag! <a:oop:805144169181741096>" , color: "#C0EEFF"}});
        else if (userData.data == null || userData.data.reason != null && userData.data.reason === "notFound") return await msg.s("The clan's war log is not public! <a:oop:805144169181741096>");
        else {
            userData = userData.data;
                let tag;
                for (i in userData.clan.members){
                    if (userData.clan.members[i].mapPosition.toString() == args[0].toString()){
                        boolx = true;
                        tag = userData.clan.members[i].tag;
                    }
                }
                const accs = msg.client.db.get(`${tag}_opponent_tag`);
                if (accs == null || accs == "null" || accs[0] == undefined){
                    return await msg.s("No bases claimed!")

            } else if (accs[0] != msg.author.id) return await msg.s(`This base has been claimed by <@${accs}>`);
            else {msg.client.db.set(`${tag}_opponent_tag`, "null"); await msg.s("Unclaimed the base!")}
            }


        
        
    }
}
