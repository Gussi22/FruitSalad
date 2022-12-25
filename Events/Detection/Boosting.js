const { GuildMember, MessageEmbed } = require("discord.js");
const { drawCard, Text } = require("discord-welcome-card");

module.exports = {
	name: "guildMemberUpdate",
	loadName: "Boost Detection",
	/**
	 * 
	 * @param {GuildMember} oldMember 
	 * @param {GuildMember} newMember 
	 */
	async execute(oldMember, newMember) {
		const { guild } = newMember;
		const boost = new MessageEmbed().setColor("PURPLE").setAuthor({
			name: "SERVER BOOSTED"
		});

		if (!oldMember.premiumSince && newMember.premiumSince) {
			const img = await drawCard({
				theme: "dark",
				blur: false,
				rounded: true,
				text: {
					title: new Text(`${newMember.user.username}!`, 350, 150)
						.setFontSize(70)
						.setFont("Brice Bold Condensed")
						.setStyle("#000000")
				},
				avatar: {
					image: newMember.user.avatarURL({
						dynamic: true,
						format: "png",
						size: 2048
					}),
					borderRadius: 1,
					imageRadius: 0.8,
					outlineColor: "#000000",
					outlineWidth: 1,
				},
				card: {
					background: "../../Structures/Images/Boost.png",
					blur: false
				}
			});

			boost.setDescription(`${newMember.displayName} has boosted the server!`);

			await guild.systemChannel
				.send({ embeds: [boost], files: [{ attachment: img }] })
				.catch((err) => console.log(err));

			boost.setDescription(`Thank you for boosting ${newMember.guild.name}!`);
			newMember.send({ embeds: [boost] });
		}
	}
}