const { ModalSubmitInteraction } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	loadName: "Modal Interaction",
	/**
	 * 
	 * @param {ModalSubmitInteraction} interaction 
	 */
	execute(interaction, client) {
		if (!interaction.isModalSubmit()) return;
		const modal = client.modals.get(interaction.customId);

		if (!modal) return;

		if (
			modal.permission &&
			!interaction.member.permissions.has(modal.permission)
		)
			return interaction.reply({
				content: "You do not have the right permission for this modal!",
				ephemeral: true
			});

		if (modal.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
			return interaction.reply({
				content: "You are not the owner of the server!",
				ephemeral: true
			});

		modal.execute(interaction, client);
	}
}