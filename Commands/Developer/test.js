const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "modal",
	description: "A button that reveals the modal menu",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("modal")
					.setLabel("Show Modal")
					.setStyle("PRIMARY")
			);

			interaction.reply({ components: [row] });
	}
}