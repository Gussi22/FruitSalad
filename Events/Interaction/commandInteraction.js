const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Owner } = require("../../Structures/config.json");

module.exports = {
	name: "interactionCreate",
	loadName: "Command Interaction",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (!command)
				return (
					interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor("RED")
								.setDescription("🔴 An error has occurred"),
						]
					}) && client.commands.delete(interaction.commandName)
				);

			if (command.botOwner && interaction.member.id !== Owner)
				return interaction.reply({
					content: "You are not my maker!",
					ephemeral: true
				});

			if (
				command.permission &&
				!interaction.member.permissions.has(command.permission)
			) {
				return interaction.reply({
					content: `You do not have the required permission for this command: \`${interaction.commandName}\``,
					ephemeral: true
				})
			}
			
			if (
				command.ownerOnly &&
				interaction.member.id !== interaction.guild.ownerId
			)
				return interaction.reply({
					content: "You are not the owner of this server!",
					ephemeral: true
				});

			command.execute(interaction, client);
		}
	}
}