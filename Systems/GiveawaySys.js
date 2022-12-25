const { GiveawaysManager } = require("discord-giveaways");
const giveawayModel = require("../Structures/Schemas/Giveaway/GiveawayDB");

module.exports = (client) => {
	const GiveawaysManagerWithOwnDatabase = class extends GiveawaysManager {
		async getAllGiveaways() {
			return await giveawayModel.find().lean().exec();
		}

		async saveGiveaway(messageId, giveawayData) {
			await giveawayModel.create(giveawayData);
			return true;
		}

		async editGiveaway(messageId, giveawayData) {
			await giveawayModel
				.updateOne({ messageId }, giveawayData, { omitUndefined: true })
				.exec();
			return true;
		}

		async deleteGiveaway(messageId) {
			await giveawayModel.deleteOne({ messageId }).exec();
			return true;
		}
	};

	const manager = new GiveawaysManagerWithOwnDatabase(client, {
		default: {
			botsCanWin: false,
			embedColor: "#FF0000",
			embedColorEnd: "#000000",
			reaction: "🎉"
		},
	});
	client.giveawaysManager = manager;
}