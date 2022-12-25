const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
	name: "ready",
	once: true,
	/**
	 * 
	 * @param {Client} client 
	 */
	execute(client) {
		console.log("Bot Online!");

		client.user.setStatus("idle");

		setInterval(() => {
			let stats = [
				"Codes Run!",
				"Gussi Code",
				"Cris.p.nyato",
				"Bot Being Made",
				"The Void"
			];
			client.user.setPresence({
				activities: [
					{
						name: stats[Math.floor(Math.random() * stats.length)],
						type: "WATCHING"
					}
				]
			})
		}, 1000 * 60);

		if (!Database) return;
		mongoose
			.connect(Database, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => {
				console.log("Connected To Database");
			})
			.catch((err) => {
				console.log(err);
			});

		require("../../Systems/LockdownSys")(client);
		require("../../Systems/ChatFilterSys")(client);
	}
}