const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "emit",
	description: "Event emitted",
	permission: "ADMINISTRATOR",
	botOwner: true,
	options: [
		{
			name: "member",
			description: "Guild member event",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					type: "STRING",
					description: "Select guild member event",
					choices: [
						{
							name: "guildMemberAdd",
							value: "guildMemberAdd"
						},
						{
							name: "guildMemberRemove",
							value: "guildMemberRemove"
						},
						{
							name: "guildMemberUpdate",
							value: "guildMemberUpdate"
						}
					]
				}
			]
		},
		{
			name: "guild",
			description: "General guild event",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					type: "STRING",
					description: "Select a guild event",
					choices: [
						{
							name: "guildCreate",
							value: "guildCreate"
						}
					]
				}
			]
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	execute(interaction, client) {
		const Reply = interaction.reply({ content: "Event emitted!", ephemeral: true });

		switch (interaction.options.getSubcommand()) {
			case "member": 
				{
					switch (interaction.options.getString("type")) {
						case "guildMemberAdd":
							{
								client.emit("guildMemberAdd", interaction.member);
								return Reply;
							}
						case "guildMemberRemove":
							{
								client.emit("guildMemberRemove", interaction.member);
								return Reply;
							}
						case "guildMemberUpdate":
							{
								client.emit("guildMemberUpdate", interaction.member);
								return Reply;
							}
					}
				}
				break;
			case "guild": {
				switch (interaction.options.getString("type")) {
					case "guildCreate":
						{
							client.emit("guildCreate", interaction.guild);
							return Reply;
						}
				}
			}
		}
	}
}