const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Rust Server Info!')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('Text to translate')
				.setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		await interaction.deferReply()
        data = {
            q: `${text}`,
            source: "auto",
		    target: "en",
		    format: "text",
		    api_key: ""
          }
		translation = await axios.post("http://10.0.0.61:5000/translate",data).then((response) => response.data);
		
        // console.log(translation);
        console.log(translation.translatedText);
		const embed = new EmbedBuilder()
		.setColor('#FF0000')
		.setTitle("Translation")
		.addFields({ name: 'Original Text: ', value: `${ text }`})
		.addFields({ name: 'Translated Text: ', value: `${ translation.translatedText}`})
        await interaction.editReply({ embeds: [embed] });
	},
}; 