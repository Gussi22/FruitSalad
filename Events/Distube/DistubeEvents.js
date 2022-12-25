const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "DistubeEvents",
	loadName: "Distube Events"
};
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `🎵 | Playing \`${song.name}\` - \`${
                song.formattedDuration
              }\`\nRequested by: ${song.user}\n${status(queue)}`
            )
            .setThumbnail(song.thumbnail),
        ],
      })
      .then((m) =>
        setTimeout(() => {
          m.delete().catch(() => {});
        }, 1000 * 5)
      )
  )
  .on("addSong", (queue, song) =>
    queue.textChannel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `📝 | Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`
            )
            .setThumbnail(song.thumbnail),
        ],
      })
      .then((m) =>
        setTimeout(() => {
          m.delete().catch(() => {});
        }, 1000 * 5)
      )
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `📝 | Added \`${playlist.name}\` playlist (${
                playlist.songs.length
              } songs) to queue\n${status(queue)}`
            )
            .setThumbnail(playlist.thumbnail),
        ],
      })
      .then((m) =>
        setTimeout(() => {
          m.delete().catch(() => {});
        }, 1000 * 5)
      )
  )
  .on("error", (channel, e) => {
    channel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `⛔ | An error encountered: ${e.toString().slice(0, 1974)}`
            ),
        ],
      })
      .then((m) =>
        setTimeout(() => {
          m.delete().catch(() => {});
        }, 1000 * 5)
      );
  })
  .on("empty", (queue) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREY")
          .setDescription("Voice channel is empty! Leaving the channel."),
      ],
    })
  )
  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREY")
          .setDescription(`⛔ | No result found for \`${query}\`!`),
      ],
    })
  )
  .on("finish", (queue) =>
    queue.textChannel
      .send({
        embeds: [
          new MessageEmbed()
            .setColor("LIGHT_GREY")
            .setDescription("Queue Finished, Leaving Channel"),
        ],
      })
      .then((m) =>
        setTimeout(() => {
          m.delete().catch(() => {});
        }, 1000 * 5)
      )
  );
