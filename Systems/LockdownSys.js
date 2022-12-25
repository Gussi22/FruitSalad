const DB = require("../Structures/Schemas/Lockdown/LockDown");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = (client) => {
	DB.find().then(async (docArr) => {
		docArr.forEach(async (d) => {
			const Channel = client.guilds.cache
				.get(d.GuildID)
				.channels.cache.get(d.ChannelID);
			if (!Channel) return;

			const TimeNow = Date.now();
			if (d.Time < TimeNow) {
				Channel.permissionOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});
				return await DB.deleteOne({ ChannelID: Channel.id });
			}
			
			const ExDate = d.Time - Date.now();

			setTimeout(async () => {
				Channel.permissionOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});
				await DB.deleteOne({ ChannelID: Channel.id });
			}, ExDate);
		})
	})
}