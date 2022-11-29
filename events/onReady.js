/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

const { EmbedBuilder } = require("discord.js");
const GuildSwitches = require("../models/GuildSwitches");
const MongoClient = require('mongodb').MongoClient;

const DBclient = new MongoClient(process.env.DB_URL);

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		var pjson = require('../package.json');
		const version = pjson.version;
		const cron = require('cron');
		const moment = require('moment');
		

		client.user.setPresence({ activities: [{ name: `/help | zeenbot.de` }], status: 'online' });
			
	}

};
