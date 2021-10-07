module.exports = {
    name: "accounts",
    description: "Check your registered accounts",
    aliases: [],
    owner: false,

    async run(msg, args) {

        const accs=msg.client.db.get(`${msg.author.id}_coc_tag`);
        if (accs==undefined) return await msg.s({ embed: {title: "No accounts linked!"}});
        let descrr;
        let userData;
        const getName = async (tag) => {
            return (await msg.client.coc.getPlayer(tag)).data
        };
        for (i in accs) {
        item = accs[i]
        userData = await getName(item);
        if (descrr == undefined){
            descrr = userData.name + item + "\n";
        } else {
            descrr = descrr + userData.name + item +"\n";
        }
        };

        await msg.s({ embed: {

            title: "The accounts linked are:" ,
            description: descrr ,
            color: "#C0EEFF"


        }});


    }
}
