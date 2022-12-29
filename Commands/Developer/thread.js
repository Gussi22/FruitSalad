const {
	CommandInteraction,
	MessageActionRow,
	MessageButton
} = require("discord.js");
const DB = require("../../Structures/Schemas/Code Share/codeShare");

module.exports = {
	name: "advertise",
	description: "Make a request to advertise your product/service",
	botOwner: true,
	options: [
		{
			name: "title",
			description: "Enter the name of your product/service",
			type: "STRING",
			required: true
		},
		{
			name: "attachment",
			description: "Input a preview attachment",
			type: "ATTACHMENT",
			required: true
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options, guild, member } = interaction;

		const text = options.getString("title	");
		const att = options.getAttachment("attachment").url;

		const btn = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId("accept-share")
				.setLabel("Accept")
				.setStyle("SUCCESS"),
			new MessageButton()
				.setCustomId("decline-share")
				.setLabel("Decline")
				.setStyle("DANGER")
		);

		const message = await interaction.channel.send({
			content: `**${text}**`,
			files: [{ attachment: att }],
			components: [btn]
		});

		const thread = await message.startThread({ name: text });

		thread.setLocked(true);
		thread.setArchived(true);

		DB.create({
			GuildID: guild.id,
			MemberID: member.id,
			MessageID: message.id,
			ThreadID: thread.id,
		});

		interaction.reply({
			content: "Thread started",
			ephemeral: true
		})
	}
}