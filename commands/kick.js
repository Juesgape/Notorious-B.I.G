module.exports = {
  name: 'kick',
  description: 'This command kicks a member!',
  execute(message, args) {
    const member = message.mentions.users.first();
    
     if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send('JA JA, No puedes usar este comando cv');

    if(!member) return message.channel.send('Debes especificar a un usuario');

    if(message.member.permissions.has("KICK_MEMBERS")){

      if(member) {
        
        if (memberTarger.kickable) {
          message.channel.send(`${member} fue expulsad@ por marica`, {files: ['./banImage.jpg']})
          memberTarger.kick();
        } else {
          message.channel.send('No puedes expulsar a tus superiores')
        }
    } else {
      message.channel.send('ERROR, algo salió mal');
    }
      
    } 

 
  
    
  }
    
  }