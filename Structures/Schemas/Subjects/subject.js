const { model, Schema } = require("mongoose");

module.exports = model(
	"Subjects",
	new Schema({
		_id: String,
		Data: Array
	})
)