const { SlashCommandBuilder,EmbedBuilder,AttachmentBuilder} = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('market')
		.setDescription('Searching Market Place!')
		.addIntegerOption(option =>
			option.setName('id')
				.setDescription('Server ID'))
        .addStringOption(option =>
            option.setName('searchitem')
                .setDescription('Item you are wanting to search for')),
	async execute(interaction) {
        const id = interaction.options.getInteger('id') ?? 1;
        const searchItem = interaction.options.getString('searchitem');
        const apiData = await axios.get(`${process.env.LOCAL_IP}/server/${id}/map`).then((response) => response.data.response.mapMarkers.markers);
        const items = await axios.get(`${process.env.LOCAL_IP}/items.json`).then((response) => response.data);

        apiData.forEach(marker => {
            if (marker.type === 'VendingMachine') {
                if (marker.hasOwnProperty('sellOrders')) {
                    for (const order of marker.sellOrders) {
                        if (marker.amountInStock === 0) {
                            continue;
                        }
                        const selling = (order.itemId in items) ? items[order.itemId].name : 'Unknown';
                        const currency = (order.currencyId in items) ? items[order.currencyId].name : 'Unknown';

                        if (selling.toLowerCase().includes(searchItem)) {
                            console.log(`${selling}, ${order.quantity}, ${order.costPerItem} ${currency}`)
                        }
                    }
                }
            }
        });
	},
}; 