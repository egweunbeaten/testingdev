const {Client, Collection, Intents, Message} = require('discord.js');
const {readdirSync } = require('fs')
const client = new Client({ intents: 32767 })
const moment = require('moment')
moment.locale('tr')
const data = require("croxydb");
client.db = data;

const { token } = require('./config.json');

client.login(token);
client.commands = new Collection();


const commandFiles = readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
	}


const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute( client, ...args));
	}
}

client.emoji = {
	evet: "<:Evet:1047248612247212072>",
	hayir: "<:Hayir:1047248609688703027>",
	ydm1: "<:YargiDM-1:1047972025030955018>",
	ydm2: "<:YargiDM:1047972014566162482>",
	sayarlar: "<:SAyarlar:1047248620556140614>",
	ayarlar: "<:Ayarlar:1047248637618573313>",
	sses: "<:SSes:1047248560258826240>",
	ses: "<:Ses:1047248558589480961>",
	kloading: "<a:KLoading:1047248608090660944>",
	sloading: "<a:SLoading:1047248613903974482>",
	yloading: "<a:YLoading:1047201403426312202>"
  }


client.on('ready', () => {
  client.channels.cache.get("1047201918759469126").send({
	embeds: [{
		fields: [
			{
				name: 'Bot Durum',
				value: `${client.emoji.yloading} ・ Aktif`,
				inline: false,
			},
			{
				name: 'Sunucu',
				value: `\`\`\`${client.guilds.cache.size}\`\`\``,
				inline: false,
			},
			{
				name: 'Kanal',
				value: `\`\`\`${client.channels.cache.size}\`\`\``,
				inline: false,
			},
			{
				name: 'Kullanıcı',
				value: `\`\`\`${client.users.cache.size}\`\`\``,
				inline: false
			},
			
		],
		color: "#00DC68",
			}],
	})


  });
  