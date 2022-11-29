const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
    guild_id: String,
    welcome_channel_id: String,
    bot_prefix: String,
    bot_language: String,
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);