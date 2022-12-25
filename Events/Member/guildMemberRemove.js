const { MessageEmbed, GuildMember } = require("discord.js");
const { drawCard, Text } = require("discord-welcome-card");

module.exports = {
	name: "guildMemberRemove",
	loadName: "Goodbye",
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
				title: new Text(`${member.user.username}`, 350, 150)
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
				background: "https://cdn.discordapp.com/attachments/960876549631012884/972357630490193930/FRUITSALADs_1.png",
				blur: false
			}
		});

		const goodbye = new MessageEmbed()
			.setColor("RED")
			.setAuthor({
				name: user.tag,
				iconURL: user.avatarURL({ dynamic: true, size: 512 })
			})
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member} Has Left **${guild.name}**!`)
			.addFields(
				{
					name: "Joined:",
					value: `<t:${parseInt(member.joinedTimestamp / 1000)}:D> | <t:${parseInt(member.joinedTimestamp / 1000)}:R>`
				},
				{
					name: "Latest Member Count:",
					value: `**${guild.memberCount}**`
				}
			)
			.setFooter({ text: `ID: ${user.id}` });

		member.guild.systemChannel.send({
			embeds: [goodbye],
			files: [{ attachment: img }]
		})
	}
}