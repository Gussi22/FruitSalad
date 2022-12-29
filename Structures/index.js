console.clear();

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767, partials: ["CHANNEL"] });

const { Token } = require("./config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();
client.voiceGenerator = new Collection();
client.menus = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnFinish: true,
	emitAddSongWhenCreatingQueue: false,
	youtubeDL: false,
	plugins: [new SpotifyPlugin()]
});
module.exports = client;

require("../Systems/GiveawaySys")(client);
require("./Handlers/Anti-Crash")(client);

["Events", "Commands"].forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);