const mongoose = require('mongoose');

const GuildSwitchesSchema = new mongoose.Schema({
    guild_id: String,
    training_announcement: Boolean,
    training_channel_id: String,
    training_embed: String,
});

module.exports = mongoose.model('GuildSwitches', GuildSwitchesSchema);