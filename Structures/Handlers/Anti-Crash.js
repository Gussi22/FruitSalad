const { MessageEmbed, WebhookClient } = require("discord.js");
const { Webhook } = require("../config.json");
const { inspect } = require("util");
const s = new WebhookClient({ url: Webhook });

module.exports = (client) => {
  client.on("error", (err) => {
    const ErrorEmbed = new MessageEmbed()
      .setTitle("Error")
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setColor("#2F3136")
      .setDescription(`\`\`\`${inspect(err, { depth: 0 })}\`\`\``)
      .setTimestamp();
    return s.send({
      embeds: [ErrorEmbed],
    });
  });
  process.on("unhandledRejection", (reason, p) => {
    const unhandledRejectionEmbed = new MessageEmbed()
      .setTitle("**π₯ There was an Unhandled Rejection/Catch π₯**")
      .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
      .setColor("RED")
      .addField(
        "Reason",
        `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .addField(
        "Promise",
        `\`\`\`${inspect(p, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .setTimestamp();
    return s.send({
      embeds: [unhandledRejectionEmbed],
    });
  });

  process.on("uncaughtException", (err, origin) => {
    const uncaughtExceptionEmbed = new MessageEmbed()
      .setTitle("**π₯There was an Uncaught Exception/Catch π₯**")
      .setColor("RED")
      .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
      .addField(
        "Error",
        `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .addField(
        "Origin",
        `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .setTimestamp();
    return s.send({
      embeds: [uncaughtExceptionEmbed],
    });
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    const uncaughtExceptionMonitorEmbed = new MessageEmbed()
      .setTitle("**π₯ There was an Uncaught Exception Monitor π₯**")
      .setColor("RED")
      .setURL(
        "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor"
      )
      .addField(
        "Error",
        `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .addField(
        "Origin",
        `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .setTimestamp();

    return s.send({
      embeds: [uncaughtExceptionMonitorEmbed],
    });
  });

  process.on("multipleResolves", (type, promise, reason) => {
    if (
      reason.toLocaleString() ===
      "Error: Cannot perform IP discovery - socket closed"
    )
      return;
    const multipleResolvesEmbed = new MessageEmbed()
      .setTitle("**π₯ There was an Multiple Resolve π₯**")
      .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
      .setColor("RED")
      .addField(
        "Type",
        `\`\`\`${inspect(type, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .addField(
        "Promise",
        `\`\`\`${inspect(promise, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .addField(
        "Reason",
        `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .setTimestamp();
    return s.send({
      embeds: [multipleResolvesEmbed],
    });
  });

  process.on("warning", (warn) => {
    const warningEmbed = new MessageEmbed()
      .setTitle("**π₯ There was an Uncaught Exception Monitor Warning π₯**")
      .setColor("RED")
      .setURL("https://nodejs.org/api/process.html#event-warning")
      .addField(
        "Warn",
        `\`\`\`${inspect(warn, { depth: 0 })}\`\`\``.substring(0, 1000)
      )
      .setTimestamp();
    return s.send({
      embeds: [warningEmbed],
    });
  });
};
