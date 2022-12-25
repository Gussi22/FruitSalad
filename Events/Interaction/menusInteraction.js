const { SelectMenuInteraction } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	loadName: "Menu Interaction",
	/**
	 * 
	 * @param {SelectMenuInteraction} interaction 
	 */
	execute(interaction, client) {
		if (!interaction.isSelectMenu()) return;
		const menu = client.menus.get(interaction.customId);

		if (!menu) return;

		if (menu.permission && !interaction.member.permissions.has(menu.permission))
			return interaction.reply({
				content: "You do not have the right permission for this menu!",
				ephemeral: true
			});
		
		if (menu.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
			return interaction.reply({
				content: "You are not the owner of this server!",
				ephemeral: true,
			});

		menu.execute(interaction, client);
	}
}