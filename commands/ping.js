module.exports.run = (client, msg, args) => {
    msg.channel.send(`Pong! ${client.ping}ms`)
}