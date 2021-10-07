const moment = require('moment');
module.exports = {
    name: "clanwar",
    description: "View yours/other clan war stats",
    aliases: ["warstatus","warstats","warstat","wardata",'war'],
    owner: false,
    async run(msg, args) {
        const authorCOCTag = msg.client.db.get(`${msg.author.id}_clan_tag`);
        let targetTag;
        if (args[0] === "" || args[0] == null && authorCOCTag == null) return await msg.s("Please provide me with a tag! <a:oop:805144169181741096>");
        if (!args[0]) targetTag = authorCOCTag;
        else targetTag = args[0];
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

            let embed2 = {
                fields: [            
                { name: 'War status: ', value: "In a War!" },
                { name: 'War start time: ', value: moment(userData.startTime).fromNow()},
                { name: 'War end time: ', value: moment(userData.endTime).fromNow()},
                { name: 'Team size: ', value: userData.teamSize},

                { name: 'Your level: ', value: userData.clan.clanLevel},
                { name: 'Your stars: ', value: userData.clan.stars},
                { name: 'Your attacks: ', value: userData.clan.attacks},
                { name: 'Your destruction %: ', value: Math.round(userData.clan.destructionPercentage)},

                { name: 'Opponent: ', value: `${userData.opponent.name}${userData.opponent.tag}`},
                { name: 'Opponent level: ', value: userData.opponent.clanLevel},
                { name: 'Opponent stars: ', value: userData.opponent.stars},
                { name: 'Opponent attacks: ', value: userData.opponent.attacks},
                { name: 'Opponent destruction %: ', value: Math.round(userData.opponent.destructionPercentage)},
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
            else if (userData.state == "warEnded") return await msg.s({ embed : embedx2 });
            else {

            let options = {
                min: 1,
                max: 2, 
                limit: 60 * 1000
            }
            let tacks = "";
            let list1 = new Array();
            let list2 = new Array();
            let alerts;
            const accs = msg.client.db.get(`${msg.author.id}_alert_tag`);
            if (userData.state != "preparation") {

            list1.push([{name: "Clan stats starts from next page!", value: "opponent stats come after"}])
            for (i in userData.clan.members){
                if (userData.clan.members[i].attacks != undefined){if (userData.clan.members[i].attacks.length == 1){ tacks = "<:check:805143672127356978> :crossed_swords:"; } else if (userData.clan.members[i].attacks.length == 2) { tacks = "<:check:805143672127356978> <:check:805143672127356978>";} else { tacks = userData.clan.members[i].attacks;}} else { tacks = ":crossed_swords: :crossed_swords:"}
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
                if (userData.clan.members[i].tag != null && accs != null) {if (accs.includes(userData.clan.members[i].tag) == true) alerts = " ( :red_square: ) "; else alerts = "";} else alerts = "";
                list2.push({ name: `**${alerts}${userData.clan.members[i].name}${userData.clan.members[i].tag}: **`, value: `Town Hall: ${userData.clan.members[i].townhallLevel}\nMap position: ${userData.clan.members[i].mapPosition}\nAttacks: ${tacks}\n` }) 
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
            }  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }

            list1.push([{name: "Opponent stats starts from next page!", value: "from the next page"}])

            tacks = "";
            for (i in userData.opponent.members){
                tacks = userData.opponent.members[i].opponentAttacks;
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
                if (userData.opponent.members[i].tag != null && accs != null) {if (accs.includes(userData.opponent.members[i].tag) == true) alerts = " ( :red_square: ) "; else alerts = "";} else alerts = "";
                list2.push({ name: `**${alerts}${userData.opponent.members[i].name}${userData.opponent.members[i].tag}: **`, value: `Town Hall: ${userData.opponent.members[i].townhallLevel}\nMap position: ${userData.opponent.members[i].mapPosition}\nTimes attacked: ${tacks}\n` }) 
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
            }  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }
            } else {




            list1.push([{name: "Clan stats starts from next page!", value: "opponent stats come after"}])
            for (i in userData.clan.members){
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
                if (userData.clan.members[i].tag != null && accs != null) {if (accs.includes(userData.clan.members[i].tag) == true) alerts = " ( :red_square: ) "; else alerts = "";} else alerts = "";
                list2.push({ name: `**${alerts}${userData.clan.members[i].name}${userData.clan.members[i].tag}: **`, value: `Town Hall: ${userData.clan.members[i].townhallLevel}\nMap position: ${userData.clan.members[i].mapPosition}` }) 
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
            }  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }

            list1.push([{name: "Opponent stats starts from next page!", value: "from the next page"}])

            tacks = "";
            for (i in userData.opponent.members){
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
                if (userData.opponent.members[i].tag != null && accs != null) {if (accs.includes(userData.opponent.members[i].tag) == true) alerts = " ( :red_square: ) "; else alerts = "";} else alerts = "";
                list2.push({ name: `**${alerts}${userData.opponent.members[i].name}${userData.opponent.members[i].tag}: **`, value: `Town Hall: ${userData.opponent.members[i].townhallLevel}\nMap position: ${userData.opponent.members[i].mapPosition}` }) 
                if (list2.length == 5) { list1.push(list2); list2 = new Array(); }
            }  if (list2.length >= 1) { list1.push(list2); list2 = new Array(); }



            }
            let page = 1;
            let count =1;


            let page1 = { title: `Clam members:`,color: "#C0EEFF"};



            let pages = {
                1: embed2,
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
}
