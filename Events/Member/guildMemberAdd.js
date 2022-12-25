const {
	GuildMember,
	MessageEmbed,
	MessageAttachment,
	MessageButton,
	MessageActionRow
} = require("discord.js");
const { drawCard, Text } = require("discord-welcome-card");

module.exports = {
	name: "guildMemberAdd",
	loadName: "Welcomer",
	/**
	 * 
	 * @param {GuildMember} member 
	 */
	async execute(member) {
		const { user, guild } = member;
		
		if (member.user.bot) return;

		const img = await drawCard({
			theme: "dark",
			blur: false,
			rounded: true,
			text: {
				title: new Text(`${member.user.username}!`, 350, 150)
					.setFontSize(70)
					.setFont("Brice Bold Condensed")
					.setStyle("#000000")
			},
			avatar: {
				image: member.user.avatarURL({
					dynamic: true,
					format: "png",
					size: 2048
				}),
				borderRadius: 1,
				imageRadius: 0.8,
				outlineWidth: 1,
				outlineColor: "#000000"
			},
			card: {
				background: "https://cdn.discordapp.com/attachments/934646336236683334/935875530543222784/unknown.png",
				blur: false
			}
		});

		const Welcome = new MessageEmbed()
			.setColor("#FFC0CB")
			.setAuthor({
				name: user.tag,
				iconURL: user.avatarURL({ dynamic: true, size: 512 })
			})
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(`Welcome ${member} to **${guild.name}**!`)
			.addFields(
				{
					name: "Account Created:",
					value: `<t:${parseInt(user.createdTimestamp / 1000)}:D> | <t:${parseInt(user.createdTimestamp / 1000)}:R>`,
					inline: true
				},
				{
					name: "Latest Member Count:",
					value: `${guild.memberCount}`,
					inline: true
				}
			)
			.setFooter({ text: `ID: ${user.id}` });

		await member.guild.systemChannel.send({
			embeds: [Welcome],
			files: [{ attachment: img }]
		})
	}
}