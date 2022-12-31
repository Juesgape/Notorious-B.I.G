module.exports = {
  name: 'ban',
  description: 'This command bans a member!',
  execute(message, args) {


    const member = message.mentions.users.first();
    

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send('JA JA, No puedes usar este comando cv');

    if(!member) return message.channel.send('Debes especificar a un usuario');

    if(message.member.permissions.has("BAN_MEMBERS")){
      
      if(member) {
      const memberTarger = message.guild.members.cache.get(member.id);
        
        if (memberTarger.bannable) {
          message.channel.send(`${member} fue banead@ por marica`, {files: ['./banImage.jpg']})
          memberTarger.ban();
        } else {
          message.channel.send('No puedes banear a tus superiores')
        }

    } else {
      message.channel.send('ERROR, algo salió mal');
    }
      
    } 

 
  
    
  }
    
  }