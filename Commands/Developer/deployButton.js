const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	CommandInteraction
} = require("discord.js");

module.exports = {
	name: "deploybuttons",
	description: "Just a test command",
	permission: "ADMINISTRATOR",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const Embed = new MessageEmbed()
			.setDescription("Click **Answer** to provide your age")
			.setColor("GREEN");

		const Row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("age-submit")
					.setStyle("SUCCESS")
					.setLabel("Answer")
			);

			interaction.reply({ embeds: [Embed], components: [Row] });
	}
}