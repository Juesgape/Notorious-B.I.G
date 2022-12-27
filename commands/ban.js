module.exports = {
  name: 'ban',
  description: 'This command bans a member!',
  execute(message, args) {

    const member = message.mentions.users.first();

  if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send('No puedes usar este comando');

    if(!member) return message.channel.send('Debes especificar a un usuario');

    if(!member.bannable) return message.channel.send('Está loc@? No puedes banear a tus superiores');

    if(message.member.permissions.has("BAN_MEMBERS")){

      if(member) {
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.kick();
      message.channel.send('Baneado por marica y manco');
    } else {
      message.channel.send('ERROR, algo salió mal');
    }
      
    } 

 
  
    
  }
    
  }