const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const { DeleteWeb } = require("../../Structures/config.json");

module.exports = {
	name: "messageDelete",
	loadName: "Message Delete",
	/**
	 * 
	 * @param {Message} message 
	 */
	execute(message) {
		if (message.author.bot) return;

		const Log = new MessageEmbed().setColor("#663A82").setDescription(
			`🗑️ A [Message](${message.url}) by ${message.author} was **deleted**\n
			**Deleted Message:**\n ${
				message.content ? message.content : "None"
			}`.slice(0, 4096)
		);

		if (message.attachments.size >= 1) {
			Log.addField(
				`Attachments:`,
				`${message.attachments.map((a) => a.url)}`,
				true
			);
		}

		new WebhookClient({ url: DeleteWeb })
			.send({ embeds: [Log] })
			.catch((err) => console.log(err));
	}
}