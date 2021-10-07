module.exports = {
    name: "clanstat",
    description: "View yours/other clans stat",
    aliases: ["clanstatus","clanstats","clan"],
    owner: false,
    async run(msg, args) {
        const authorCOCTag = msg.client.db.get(`${msg.author.id}_clan_tag`);
        let targetTag;
        if (args[0] === "" || args[0] == null && authorCOCTag == null) return await msg.s("Please provide me with a tag!");
        if (!args[0]) targetTag = authorCOCTag;
        else targetTag = args[0];
        const userData = (await msg.client.coc.getClan(targetTag)).data;
        if (userData == null || userData.reason != null && userData.reason === "notFound") await msg.s(authorCOCTag != null ? "No result from the tag! <a:oop:805144169181741096>" : "Did you mean to use stats? <a:oop:805144169181741096>");
        else {
            let invitetype;
            if (userData.type == "inviteOnly"){
                invitetype = "Invite only"
            } else { invitetype = "Public" }
           let desc = userData.description;
            if (userData.description == '' || userData.description == null || userData.description == undefined) desc = "No description found!";
            let embed = {

                fields: [            
                { name: 'Clan description: ', value: desc },    
                { name: 'Clan level: ', value: userData.clanLevel },
                { name: 'War wins: ', value: userData.warWins },
                { name: 'War Leauge: ', value: userData.warLeague.name },
                { name: 'Join method: ', value: invitetype },
                ],
                title: `Stats for ${userData.name}${userData.tag}`,
                thumbnail: {
                url: userData.badgeUrls.medium,
                },
                color: "#C0EEFF"
            };
        let options = {
                min: 1,
                max: 2, 
                limit: 60 * 1000
            }
            let pos = "";
            let league = "";
            let list1 = new Array();
            let list2 = new Array();
            for (i in userData.memberList){
                league = userData.memberList[i].league.name;
                if (league == undefined) league = "No League!";
                if (userData.memberList[i].role == undefined) { pos = "" } else { pos = userData.memberList[i].role};          
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
                list2.push({ name: `**${userData.memberList[i].name}${userData.memberList[i].tag}: **`, value: `League: ${userData.memberList[i].league.name}\nPosition: ${pos}` }) 
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
            }  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }

            let page = 1;
            let count =1;


            let page1 = { title: `Clan members:`,color: "#C0EEFF"};



            let pages = {
                1: embed,
            }


            const m = await msg.s({ embed: pages[page] });


            await m.react('⬅');
            await m.react('🗑');
            await m.react('➡');


            const removeReaction = async (m, msg, emoji) => {
                try { m.reactions.resolve(emoji).users.remove(msg.author.id); } catch(err) { console.log(err) }
            }

            const filter = (reaction, user) => {
                return ['⬅', '➡', '🗑'].includes(reaction.emoji.name) && user.id == msg.author.id;
            };

            const awaitReactions = async (msg, m, options, filter) => {
            let { min, max, limit } = options;
                
                m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
                .then(async (collected) => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '⬅') {
                        await removeReaction(m, msg, reaction);
                        if (page != min && count == 1) {
                            page = min;
                            await m.edit({ embed: pages[page] });
                        } else if (count != 1 && page == max) { 
                            count--;
                            await m.edit({ embed: { title: `Clan members`,color: "#C0EEFF", fields: list1[count-1]} });
                         }
                        awaitReactions(msg, m, options, filter);     
                    }
                    else if (reaction.emoji.name === '➡') {
                        await removeReaction(m, msg, reaction);
                        if (count != list1.length+1) { 
                            page=max;
                            await m.edit({ embed: { title: `Clan members:`,color: "#C0EEFF", fields: list1[count-1]} });
                            if (count != list1.length) count++;
                         }
                        awaitReactions(msg, m, options, filter);
                    }
                    else if (reaction.emoji.name === '🗑') {
                        return await m.delete();
                    }
                    else {
                        awaitReactions(msg, m, options, filter);
                    };
                    
                }).catch(() => {});
            }

            awaitReactions(msg, m, options, filter);



            
        }
    
    }
}
