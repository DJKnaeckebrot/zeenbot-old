/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const GuildSettings = require("../../../models/GuildSettings");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("setwelcomechannel")
		.setDescription("Sets the welcoe channel for the server")
		.addChannelOption(option => option.setName('welcome').setDescription('The channel to set as the welcome channel').setRequired(true)),

	async execute(interaction) {
		
		// Check for admin permissions
		if (!interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) return interaction.reply({ content: 'You do not have permissions to use this command!', ephemeral: false });

		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.error(err);
				return interaction.reply({ content: 'An error occured!', ephemeral: true });
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: interaction.options.getChannel('welcome').id,
					bot_prefix: '!',
					bot_language: 'en',
				});
			} else {
				settings.welcome_channel_id = interaction.options.getChannel('welcome').id;
			}

			settings.save(err => {
				if (err) {
					console.error(err);
					return interaction.reply({ content: 'An error occured!', ephemeral: true });
				}

				return interaction.reply({ content: `Welcome channel has been set to <#${interaction.options.getChannel('welcome')}>!`, ephemeral: true });
			});
		});

	},
};
