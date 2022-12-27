module.exports = {
  name: 'kick',
  description: 'This command kicks a member!',
  execute(message, args) {
    const member = message.mentions.users.first();
    
     if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send('No puedes usar este comando');

    if(!member) return message.channel.send('Debes especificar a un usuario');

    if(!member.kickable) return message.channel.send('Está loc@? No puedes expulsar a tus superiores');

    if(message.member.permissions.has("KICK_MEMBERS")){

      if(member) {
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.kick();
      message.channel.send('Expulsado por marica');
    } else {
      message.channel.send('ERROR, algo salió mal');
    }
      
    } 

 
  
    
  }
    
  }