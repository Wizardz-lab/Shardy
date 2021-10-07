module.exports = {
    name: "help",
    description: "The help command",
    aliases: ["h"],
    usage: "help",
    owner: false,
    async run(msg, args) {
        if (!args[0]) {
            let help = {
                title: "Help",
                fields: [],
                description: `Help menu for ${msg.client.user.username}, a COC bot. You can find my commands listed here!`,
                footer: {
                    text: "You can do `help COMMAND_NAME` to get more precise help about the command!"
                },
                thumbnail: {
                    url: msg.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
                },
                color: "#C0EEFF"
            };
            msg.client.commands.forEach((c) => {

                help.fields.push({
                    name: c.name,
                    value: c.description,
                    inline: true
                });

            });
            await msg.s({embed: help});
        } else {
            let command = msg.client.commands.get(args[0]) || msg.client.commands.get(msg.client.aliases.get(args[0]));
            if (!command) return msg.s("Command not found!");
            await msg.s({
                embed: {
                    description: `Help about ${command.name}`,
                    fields: [
                        {
                            name: "Description",
                            value: command.description || "None"
                        },
                        {
                            name: "Usage",
                            value: command.usage || "None"
                        },
                        {
                            name: "Aliases",
                            value: command.aliases.join("\n") || "None"
                        },
                    ],
                    thumbnail: {
                        url: msg.client.user.avatarURL({
                            format: "png",
                            size: 1024
                        })
                    },
                    color: "#C0EEFF"
                }
            });
        }
    }
}
