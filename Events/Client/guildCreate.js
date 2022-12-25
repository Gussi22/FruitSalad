const { Guild, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "guildCreate",
	once: true,
	/**
	 * 
	 * @param {Guild} guild 
	 * @param {Client} client 
	 */
	async execute(guild, client) {
		await guild.commands.set(client.commands);

		guild.members.cache
			.get(guild.ownerId)
			.send({
				embeds: [
					new MessageEmbed()
						.setTitle("Thanks for inviting me!")
						.setDescription(
							"Get started by using the command `/help` to view all of the commands I have!"
						)
						.setColor("#FEBF10")
						.setFooter({ text: "Any concerns can be sent to Gussi#1740" })
				]
			})
	}
}