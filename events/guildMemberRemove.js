module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		member.guild.channels.cache.get("1041329219646533746").send(`${member.user} has left the server!`);
	}
}