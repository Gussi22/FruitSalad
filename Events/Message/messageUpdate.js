const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const { EditWeb } = require("../../Structures/config.json");

module.exports = {
	name: "messageUpdate",
	loadName: "Message Update",
	/**
	 * 
	 * @param {Message} oldMessage 
	 * @param {Message} newMessage 
	 */
	execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;

		if (oldMessage.content === newMessage.content) return;

		const Count = 1950;

		const Original =
			oldMessage.content.slice(0, Count) +
			(oldMessage.content.length > Count ? " ..." : "");
		const Edited =
			newMessage.content.slice(0, Count) +
			(oldMessage.content.length > Count ? " ..." : "");

		const Log = new MessageEmbed()
			.setColor("#FFC0CB")
			.setDescription(
				`📝 A [Message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}\n
				**Original**:\n ${Original} \n**Edited**:\n ${Edited}`
			)
			.setFooter({ text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

		new WebhookClient({ url: EditWeb })
			.send({ embeds: [Log] })
			.catch((err) => console.log(err	));
	}
}