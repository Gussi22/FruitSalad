const { CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/Subjects/subject");

module.exports = {
	name: "subject",
	description: "Add or remove a subject from your schedule list",
	options: [
		{
			name: "add",
			type: "SUB_COMMAND",
			description: "Add a subject to your schedule list",
			options: [
				{
					name: "name",
					description: "Enter the name of the subject",
					type: "STRING",
					required: true
				},
				{
					name: "time",
					description: "Enter the time of the subject (HH:MM AM/PM - HH:MM AM/PM)",
					type: "STRING",
					required: true
				},
				{
					name: "link",
					description: "Enter the URL of the meeting or where meeting links are usually posted",
					type: "STRING",
					required: true
				},
				{
					name: "day",
					description: "Choose if it is in MWF or TTH",
					type: "STRING",
					required: true,
					choices: [
						{ name: "MWF", value: "mwf" },
						{ name: "TTH", value: "tth" }
					]
				}
			]
		},
		{
			name: "remove",
			type: "SUB_COMMAND",
			description: "Remove a subject to your schedule list",
			options: [
				{
					name: "name",
					description: "Enter the name of the subject",
					type: "STRING",
					required: true
				}
			]
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { user, options } = interaction;
		const SubCom = options.getSubcommand();

		switch (SubCom) {
			case "add":
				{
					const subjectData = {
						Name: options.getString("name"),
						Time: options.getString("time"),
						Link: options.getString("link"),
						Day: options.getString("day")
					};

					let userData = await DB.findOne({ _id: user.id });

					if (!userData)
						userData = await DB.create({
							_id: user.id,
							Data: [subjectData]
						});
					else userData.Data.push(subjectData) && (await userData.save());

					interaction.reply({ content: "Subject added", ephemeral: true });
				}
				break;

			case "remove": 
				{
					await DB.findOneAndUpdate(
						{ _id: user.id },
						{ $pull: { Data: { Name: options.getString("name") } } }
					);
					interaction.reply({ content: "Subject removed", ephemeral: true });
				}
				break;
		}
	}
}