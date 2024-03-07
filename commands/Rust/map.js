const { SlashCommandBuilder,EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Rust Server Map!')
		.addIntegerOption(option =>
			option.setName('id')
				.setDescription('Server ID')),
	async execute(interaction) {
		const id = interaction.options.getInteger('id') ?? 1;
		const file = new AttachmentBuilder(`${process.env.LOCAL_IP}/map${id}.jpg`, 'map.jpg');
		const embed = new EmbedBuilder()
        .setImage('attachment://map.jpg');

		await interaction.reply({ embeds: [embed], files: [file] });
	},
}; 