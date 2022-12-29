const { model, Schema } = require("mongoose");

module.exports = model(
	"codeShare",
	new Schema({
		GuildID: String,
		MemberID: String,
		MessageID: String,
		ThreadID: String
	})
)