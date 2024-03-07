const axios = require('axios');

// Returns remaining durability from total durability as decay then calculates timeLeft
function decay(dur, health, time) {
  decay = dur / health;
  timeLeft = Math.round(decay * time);
}

function time(number) {
  const newTime = new Date(0, 0);
  newTime.setMinutes(+number * 60);
  const time = newTime.toTimeString().slice(0, 5);
  return time;
}

async function smartSwitch(device, toggle) {
  try {
    const apiDatas = await axios.get(`${process.env.LOCAL_IP}/db/device/${device}`).then(response => response.data);
    for (const apiData of apiDatas) {
      //await axios.get(`${process.env.LOCAL_IP}/switch/${toggle}/${apiData.entityId}`).then(response => response.data);
      console.log(apiData)
      const status = 'Sucess'
    }
  } catch (error) {
    console.error(error);
    const status = 'Failed'
  }
}

module.exports = { time, decay, smartSwitch };
