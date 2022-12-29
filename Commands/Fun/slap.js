const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "slap",
	description: "slaps a user",
	options: [
		{
			name: "target",
			description: "Enter the target user to slap",
			description: "USER",
			required: true
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { options } = interaction;
		const Target = options.getMember("target");
		const img = [
			"https://media3.giphy.com/media/m6etefcEsTANa/giphy.gif?cid=790b7611aceaaf4dc005636378ec7a1bf67f9ded80c5fc2a&rid=giphy.gif&ct=g",
      "https://i.pinimg.com/originals/65/57/f6/6557f684d6ffcd3cd4558f695c6d8956.gif",
      "https://i.pinimg.com/originals/1c/8f/0f/1c8f0f43c75c11bf504b25340ddd912d.gif",
      "https://c.tenor.com/Lc7C5mLIVIQAAAAC/tenor.gif",
      "https://64.media.tumblr.com/1f24b0df1789bc346c97bfb765fa06cf/tumblr_psab9sW3IC1sk6fb9_1280.gif",
		];

		if (Target == interaction.member)
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("BLUE")
						.setDescription(`${interaction.member} has slapped themselves`)
				]
			});

		if (!Target) {
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("🟥 No target given to slap!")
				]
			});
		} else {
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("BLUE")
						.setDescription(`${interaction.member} has slapped ${Target}`)
						.setImage(img[Math.floor(Math.random() * img.length)])
				]
			})
		}
	}
}