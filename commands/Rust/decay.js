const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require('discord.js');
const axios = require('axios');
const tools = require('../../functions/tools');
const file = new AttachmentBuilder('./imgs/rust_logo.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decay')
		.setDescription('Time till decay!')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('type')
				.setRequired(true)
				.addChoices(
					{ name: 'Armored Door / Double Door', value: 'Armored Door / Double Door' },
					{ name: 'Armored Wall', value: 'Armored Wall' },
					{ name: 'Garage Door', value: 'Garage Door' },
					{ name: 'Metal wall', value: 'Metal wall' },
					{ name: 'Sheet Metal Door/ Double Door', value: 'Sheet Metal Door/ Double Door' },
					{ name: 'Stone wall', value: 'Stone wall' },
					{ name: 'Twig wall', value: 'Twig wall' },
					{ name: 'Wood wall', value: 'Wood wall' },
				))
		.addIntegerOption(option =>
			option.setName('dur')
			.setDescription('Durability')
			.setRequired(true)
			),
		
	async execute(interaction) {
		const type = interaction.options.getString('type');
		const dur = interaction.options.getInteger('dur');
		const data = await axios.get(`${process.env.LOCAL_IP}/decay.json`).then((response) => response.data);

		for (const datas of data) {
			typeData = datas.name;
			if (typeData.includes(type)) {
				tools.decay(dur, datas.health, datas.time)
				const embed = new EmbedBuilder()
				.setColor('#FF0000')
				.setThumbnail('attachment://rust_logo.png')
				.addFields({ name: 'Time Left: ', value: `${type}, with ${dur} hp, has ${timeLeft} mins left till total decay!`})
				await interaction.reply({ embeds: [embed], files: [file]  });
			}
		}
	},
}; 