const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Commands Loaded");

	CommandsArray = [];

	(await PG(`${process.cwd()}/Commands/**/*.js`)).map(async (file) => {
		const command = require(file);

		if (!command.name)
			return Table.addRow(file.split("/")[5], "🔴 FAILED", "Missing Name");

		if (!command.context && !command.description)
			return Table.addRow(command.name, "🔴 FAILED", "Missing Description");

		if (command.permission) {
			if (Perms.includes(command.permission)) command.defaultPermission = false;
			else return Table.addRow(command.name, "🔴 FAILED", "Invalid Permissions");
		}

		client.commands.set(command.name, command);
		CommandsArray.push(command);
		const L = file.split("/");
		await Table.setHeading("Name", "Status", "Directory").addRow(command.name, "🟢 SUCCESS", `${L[4] + `/` + L[5]}`);
	});

	console.log(Table.toString());

	client.on("ready", async () => {
		client.guilds.cache.forEach((g) => {
			g.commands.set(CommandsArray);
		});
	});
};