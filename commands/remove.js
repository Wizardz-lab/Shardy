function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

module.exports = {
    name: "remove",
    description: "Remove a registered account.",
    aliases: ['remacc','removeaccount'],
    owner: false,

    async run(msg, args) {
        if (args[0] === "" || args[0] == null) return await msg.s({ embed: {
                title: 'Please provide me with your tag! (Include #)',
                color: "#C0EEFF"
            } });
        await msg.s({ embed: {title: "Checking player account... <a:processing:805142913738080266>" , color: "#C0EEFF"}});

        let accs=msg.client.db.get(`${msg.author.id}_coc_tag`);
        if (accs == undefined) return await msg.s({ embed: {title: "No accounts linked!"}});
        let boolx;
        accs.forEach(function (item, index) {
        	if (item == args[0]){ boolx = true }
		});
		if (boolx != true) return await msg.s({embed : {title: "Invalid account tag! <a:oop:805144169181741096>" , color: "#C0EEFF"}});
		accs = arrayRemove(accs,args[0])
        msg.client.db.set(`${msg.author.id}_coc_tag`, accs);
        await msg.s({ embed: {

            description: `Removed account ${args[0]}! <a:check:805143672127356978>` ,
            color: "#C0EEFF"


        }});


    }
}
