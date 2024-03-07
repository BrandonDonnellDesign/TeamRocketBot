const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require('discord.js');
const axios = require('axios');
const tools = require('../../functions/tools');
const file = new AttachmentBuilder('./imgs/rust_logo.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Rust Server Time!')
		.addIntegerOption(option =>
			option.setName('id')
				.setDescription('Server ID')),
	async execute(interaction) {
		const id = interaction.options.getInteger('id') ?? 1;
        const timeInfo = await axios.get(`${process.env.LOCAL_IP}/server/${id}/time`).then((response) => response.data);
        // Conversion to hours and mins
        const time = tools.time(timeInfo.response.time.time);
        const sunrise = tools.time(timeInfo.response.time.sunrise);
        const sunset = tools.time(timeInfo.response.time.sunset);
		
		const embed = new EmbedBuilder()
		.setColor('#FF0000')
		.setTitle("Server Time")
		.setThumbnail('attachment://rust_logo.png')
		.addFields({ name: 'Time: ', value: `${ time}`})
		.addFields({ name: 'Sunrise: ', value:  `${ sunrise }`})
		.addFields({ name: 'Sunset: ', value: `${ sunset }`})

		await interaction.reply({ embeds: [embed], files: [file]  });
	},
}; 