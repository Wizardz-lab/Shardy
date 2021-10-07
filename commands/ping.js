module.exports = {
    name: "ping",
    description: "Sends my ping!",
    aliases: [],
    owner: false,
    async run(msg, _args) {
        await msg.s(`Pong! ${msg.client.ws.ping}ms! <a:done:805143015290961922>`)
    }
}
