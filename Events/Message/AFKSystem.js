const { Message, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFK/AFKSystem");

module.exports = {
	name: "messageCreate",
	loadName: "AFK System",
	/**
	 * 
	 * @param {Message} message 
	 */
	async execute(message) {
		if (message.author.bot) return;

		if (message.channel.type === "DM") return;

		await DB.deleteOne({
			GuildID: message.guild.id,
			UserID: message.author.id
		});

		if (message.mentions.members.size) {
			const Embed = new MessageEmbed().setColor("RED");
			message.mentions.members.forEach((m) => {
				DB.findOne(
					{ GuildID: message.guild.id, UserID: m.id },
					async (err, data) => {
						if (err) throw err;
						if (!data) return;
						if (data)
							Embed.setDescription(
								`${m} went AFK <:t${date.Time}:R>\n**Status**: ${data.Status}`
							);
						return message.reply({ embeds: [Embed] });
					}
				)
			})
		}
	}
}