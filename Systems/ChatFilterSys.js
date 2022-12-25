const Schema = require("../Structures/Schemas/Filter/FilterDB");

module.exports = (client) => {
	Schema.find().then((document) => {
		document.forEach((doc) => {
			client.filters.set(doc.Guild, doc.Words);
			client.filtersLog.set(doc.Guild, doc.Log);
		})
	})
}