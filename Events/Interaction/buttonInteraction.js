const { ButtonInteraction } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	loadName: "Button Interaction",
	/**
	 * 
	 * @param {ButtonInteraction} interaction 
	 */
	execute(interaction, client) {
		if (!interaction.isButton()) return;
		const Button = client.buttons.get(interaction.customId);

		if (!Button) return;

		if (
			Button.permission && !interaction.member.permissions.has(Button.permission)
		)
			return interaction.reply({
				content: "You do not have the right permissions for this button!",
				ephemeral: true
			});

		if (Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
			return interaction.reply({
				content: "You are not the owner of the server!",
				ephemeral: true
			});

		Button.execute(interaction, client);
	}
}