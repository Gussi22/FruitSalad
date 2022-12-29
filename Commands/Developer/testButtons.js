const { MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
	name: "testbutton",
	description: "Sends test buttons",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("Hello")
					.setLabel("Hello")
					.setStyle("PRIMARY"),
				new MessageButton()
					.setCustomId("Bye")
					.setLabel("Bye")
					.setStyle("SECONDARY")
			);

			interaction.reply({ components: [row] });
	}
}