const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "subjectbuttons",
	description: "Sends buttons for subjects",
	permission: "ADMINISTRATOR",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		interaction.reply({
			content: "Buttons sent",
			ephemeral: true
		});

		interaction.channel.send({
			embeds: [
				new MessageEmbed()
					.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true, size: 512 }) })
					.setTitle("Subjects")
					.setDescription("Press the buttons bellow to see the links of our subjects")
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId("MWF")
						.setLabel("MWF Classes")
						.setStyle("PRIMARY"),
					new MessageButton()
						.setCustomId("TTH")
						.setLabel("TTH Classes")
						.setStyle("PRIMARY")
				)
			]
		})
	}
}