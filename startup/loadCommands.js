const { readdirSync } = require("fs");
const { sep } = require("path");
module.exports = (client) => {
    function _loadCommand(path, name) {
        const c = require(`${path}${sep}${name}`)
        client.commands.set(c.name, c);
        c.aliases.forEach((a) => {
            client.aliases.set(a, c.name);
        });
    }

    readdirSync(`${__dirname}/../commands`).
        filter((f) => f.endsWith(".js")).
        forEach(async (command) => {
            _loadCommand(`${__dirname}/../commands`, command);
        });
};
