const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "messageCreate",
	loadName: "Filter System",
	/**
	 * 
	 * @param {Message} message 
	 * @param {Client} client 
	 */
	async execute(message, client) {
		if (message.author.bot) return;
		if (message.channel.type === "DM") return;

		const { content, guild, author, channel } = message;
		const messageContent = content.toLowerCase().split(" ");

		const Filter = client.filters.get(guild.id);
		if (!Filter) return;

		const wordsUsed = [];
		let shouldDelete = false;

		messageContent.forEach((word) => {
			if (Filter.includes(word)) {
				wordsUsed.push(word);
				shouldDelete = true
			}
		});

		if (shouldDelete) message.delete().catch(() => {});

		if (wordsUsed.length) {
			const channelID = client.filtersLog.get(guild.id);
			if (!channelID) return;
			const channelOb = guild.channels.cache.get(channelID);
			if (!channelOb) return;

			const Embed = new MessageEmbed()
				.setColor("RED")
				.setAuthor({
					name: author.tag,
					iconURL: author.displayAvatarURL({ dynamic: true })
				})
				.setDescription(
					[
						`Used ${wordsUsed.length} blacklisted word(s) in ${channel} =>`,
						`\`${wordsUsed.map((w) => w).join(", ")}\``
					].join("\n")
				)

			channelOb.send({ embeds: [Embed] })
		}
	}
}