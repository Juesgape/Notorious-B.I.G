const fetch = require('node-fetch')

module.exports = {
  name: 'waifu',
  description: 'This command sends a picture of a waifu',
  execute(message, args, Discord) {
    const URL = 'https://api.waifu.pics/sfw/waifu';

    //define the embed message
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#304281')
      .setTitle('Waifus a su servicio')
      .setImage()

    //Get the image from the API
    fetch(URL)
      .then(res => res.json())
      .then(img => {
        //set the image in the embed
        newEmbed.setImage(img.url)
        message.channel.send(newEmbed)
      })
  }  
}