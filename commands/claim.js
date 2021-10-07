module.exports = {
    name: "claim",
    description: "Claim a base to attack!",
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
            let embed = {
                fields: [            
                { name: 'War status: ', value: "Not in a war!" },
                ],
                title: `Stats for ${clanData.name}${clanData.tag}`,
                thumbnail: {
                url: userData.clan.badgeUrls.medium,
                },
                color: "#C0EEFF"
            };
            let embedx2 = {
                fields: [            
                { name: 'War status: ', value: "War ended!" },
                ],
                title: `Stats for ${clanData.name}${clanData.tag}`,
                thumbnail: {
                url: userData.clan.badgeUrls.medium,
                },
                color: "#C0EEFF"
            };

            if (userData.state == "notInWar") return await msg.s({ embed : embed });
            else if (userData.state == "warEnded") return await msg.s({ embed : embed });
            else{

                let boolx;
                let tag;
                for (i in userData.clan.members){
                    if (userData.clan.members[i].mapPosition.toString() == args[0].toString()){
                        boolx = true;
                        tag = userData.clan.members[i].tag;
                    }
                }
                if (boolx == true) {
                const accs = msg.client.db.get(`${tag}_opponent_tag`);
                if (accs == null || accs == "null" || accs[0] == undefined){
                msg.client.db.set(`${tag}_opponent_tag`, msg.author.id);
                originalmsg = msg.author
                await msg.s("Claimed the base for 1 hour!").then(msgx => {
                        setTimeout(function() {
                            if ( msg.client.db.get(`${tag}_opponent_tag`) == null || msg.client.db.get(`${tag}_opponent_tag`) == [] || msg.client.db.get(`${tag}_opponent_tag`) == "null" || msg.client.db.get(`${tag}_opponent_tag`)[0] == undefined) {
                                msgx.edit(`Base already unclaimed!`);
                            } else {
                            msg.client.db.set(`${tag}_opponent_tag`, "null");
                            msgx.edit(`Unclaimed the base ${originalmsg.toString()}!`); }
                        }, 60*60*1000);
                })
            } else return await msg.s(`That base has already been claimed by <@${accs}>`);
            } else return await msg.s("Invalid map position provided!");


        }
        }
    }
}
