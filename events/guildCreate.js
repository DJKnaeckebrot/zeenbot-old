/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

 const { EmbedBuilder } = require("discord.js");
 const GuildSwitches = require("../models/GuildSwitches");
 const GuildSettings = require("../models/GuildSettings");
 const MongoClient = require('mongodb').MongoClient;
 
 const DBclient = new MongoClient(process.env.DB_URL);
 
 module.exports = {
     name: "guildCreate",
     once: true,
 
     /**
      * @description Executes when client is ready (bot initialization).
      * @param {import('../typings').Client} client Main Application Client.
      */
     
     execute(guild) {
        console.log(`Joined a new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

        // Check if guild is already in database
        GuildSettings.findOne({ guild_id: guild.id }, (err, settings) => {
			if (err) {
				console.error(err);
				return;
			}

            if (!settings) {
                const settings = new GuildSettings({
                    guild_id: guild.id,
                    bot_prefix: "!",
                    welcome_channel_id: "",
                    bot_language: "en",
                });
        
                settings.save(err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        });

        GuildSwitches.findOne({ guild_id: guild.id }, (err, switches) => {
            if (err) {
                console.error(err);
                return;
            }

            if (!switches) {
                const switches = new GuildSwitches({
                    guild_id: guild.id,
                    training_announcement: false,
                    training_channel_id: "",
                    training_embed: "",
                });
            
                switches.save(err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        });          
     }
 
 };
 