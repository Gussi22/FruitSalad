const { CommandInteraction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "meme",
	description: "Sends a random meme",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const url = await fetch("https://www.reddit.com/r/memes/random/.json");
		const random = await url.json();
		const data = random[0].data.children[0].data;

		const embed = new MessageEmbed()
			.setTitle(`${data.title}`)
			.setURL(`https://reddit.com${data.permalink}`)
			.setColor("RANDOM")
			.setImage(data.url)
			.setFooter({ text: `👍 ${data.ups} | 💬 ${data.num_comments}` });

		await interaction.reply({ embeds: [embed] });
	}
}