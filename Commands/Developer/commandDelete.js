const { REST } = require("@discordjs/rest");
const { CommandInteraction, Client } = require("discord.js");
const { Routes } = require("discord-api-types/v9");

const { Token, ClientID } = require("../../Structures/config.json");

module.exports = {
	name: "delete",
	description: "Deletes a command",
	permission: "ADMINISTRATOR",
	botOwner: true,
	options: [
		{
			name: "command",
			description: "Enter the command id",
			type: "STRING",
			required: true
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options } = interaction;

		const command = options.getString("command");

		const rest = new REST({ version: "9" }).setToken(Token);
		rest.get(Routes.applicationCommands(ClientID));

		const promises = [];
		const deleteUrl = `${Routes.applicationCommands(ClientID)}/${command}`;
		promises.push(rest.delete(deleteUrl));

		interaction.reply({ content: "Command deleted!", ephemeral: true });
		return Promise.all(promises);
	}
}