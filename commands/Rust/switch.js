const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require('discord.js');
const axios = require('axios');
const tools = require('../../functions/tools');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('switch')
    .setDescription('Smart Switch Controls')
    .addStringOption((option) =>
      option
        .setName('toggle')
        .setDescription('Turns Switch off or on')
        .setRequired(true)
        .addChoices({ name: 'On', value: 'on' }, { name: 'Off', value: 'off' })
    )
    .addStringOption((option) =>
      option
        .setName('device')
        .setDescription('Device to control')
        .setRequired(true)
        .addChoices(
          { name: 'Door', value: 'door' },
          { name: 'SAM', value: 'sam' },
          { name: 'Turret', value: 'turret' }
        )
    )
    .addIntegerOption((option) =>
      option.setName('id').setDescription('Server ID')
    ),
  async execute(interaction) {
    const id = interaction.options.getInteger('id') ?? 1;
    const toggle = interaction.options.getString('toggle');
    const device = interaction.options.getString('device');
	
	tools.smartSwitch(device, toggle)
  },
};
