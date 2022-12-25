const { Events } = require("../Validation/EventNames");

module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Events Loaded");

	(await PG(`${process.cwd()}/Events/**/*.js`)).map(async (file) => {
		const event = require(file);

		if (!Events.includes(event.name) || !event.name) {
			const L = file.split("/");
			await Table.addRow(
				`${event.name || "MISSING"}`,
				`🔴 Event Name Is Invalid Or Missing: ${L[4] + `/` + L[5]}`
			);
			return;
		}
		if (event.once || event === "DistubeEvents.js") {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
		const L = file.split("/");
		await Table.setHeading("Name", "Status", "Directory").addRow(
			event.loadName ? event.loadName : event.name,
			"🟢 SUCCESS",
			`${L[4] + `/` + L[5]}`
		);
	});
	console.log(Table.toString());
}