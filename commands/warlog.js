module.exports = {
    name: "warlog",
    description: "Check your clan's warlogs!",
    aliases: ["wl",'warlogs'],
    owner: false,

    async run(msg, args) {
        const authorCOCTag = msg.client.db.get(`${msg.author.id}_clan_tag`);
        let targetTag;
        if (args[0] === "" || args[0] == null && authorCOCTag == null) return await msg.s("Please provide me with a tag! <a:oop:805144169181741096>");
        if (!args[0]) targetTag = authorCOCTag;
        else targetTag = args[0];
        let userData = (await msg.client.coc.getClanWarLog(targetTag));
        const clanData = (await msg.client.coc.getClan(targetTag)).data;
        if (clanData == null || clanData.reason != null && clanData.reason === "notFound") return await msg.s({embed : {title: "Invalid clan tag! <a:oop:805144169181741096>" , color: "#C0EEFF"}});
        else if (userData.data == null || userData.data.reason != null && userData.data.reason === "notFound") return await msg.s("The clan's war log is not public! <a:oop:805144169181741096>");
        else {
            userData = userData.data.items;

            let options = {
                min: 1,
                max: 2, 
                limit: 60 * 1000
            }
            let list1 = new Array();
            let list2 = new Array();
            for (i in userData){
                if (userData[i].result != null && userData[i].result != undefined) {
                if (list2.length == 10) { list1.push(list2); list2 = new Array(); }
                list2.push({ name: `Against: ${userData[i].opponent.name}${userData[i].opponent.tag}`, value: `Result: ${userData[i].result}\nTeam size: ${userData[i].teamSize}` }) 
                if (list2.length == 10) { list1.push(list2); list2 = new Array(); }
            }}  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }

            let page = 1;
            let count =1;

            const m = await msg.s({ embed: { title: `War logs:`,color: "#C0EEFF", fields: list1[0]}});


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
                        if (count != 1) { 
                            count--;
                            await m.edit({ embed: { title: `War logs:`,color: "#C0EEFF", fields: list1[count-1]} });
                         }
                        awaitReactions(msg, m, options, filter);     
                    }
                    else if (reaction.emoji.name === '➡') {
                        await removeReaction(m, msg, reaction);
                        if (count != list1.length+1) { 
                            if (count != list1.length) count++;
                            await m.edit({ embed: { title: `War logs:`,color: "#C0EEFF", fields: list1[count-1]} });
                            
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
