const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Rust Server Info!')
		.addIntegerOption(option =>
			option.setName('id')
				.setDescription('Server ID')),
	async execute(interaction) {
		const id = interaction.options.getInteger('id') ?? 1;
		server = await axios.get(`${process.env.LOCAL_IP}/server/${id}/`).then((response) => response.data);
		
		const embed = new EmbedBuilder()
		.setColor('#FF0000')
		.setTitle(server.name)
		.setThumbnail(server.headerImage)
		.addFields({ name: 'Map Size: ', value: `${ server.mapSize}`, inline: true })
		.addFields({ name: 'Server Population: ', value:  `${server.players}/${server.maxPlayers}`, inline: true })
		.addFields({ name: 'Map Seed: ', value: `${ server.seed}`, inline: true })

		await interaction.reply({ embeds: [embed] });
	},
}; 