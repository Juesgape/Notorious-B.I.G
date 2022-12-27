const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")

const Database = require("@replit/database")

const db = new Database()
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const sadWords = ["triste","estoy triste", "triste estoy", "Triste estoy","Estoy triste", "depresion", "depresivo", "depresiva", "depresión", "Depresión", "me quiero matar", "Me quiero matar", "ya no aguanto", "Ya no aguanto", "estresado", "estresada", "Me siento mal", "me siento mal", "me siento triste", "Me siento triste", "Me quiero morir", "me quiero morir", "suicidar", "Suicidar", "deprimido", "Deprimido", "Me quiero morir", "me quiero morir", "morirme"]

const starterEncouragements = [
  "¡Eres genial, no te rindas!",
  "Eres la mejor persona que existe, beijo 😘",
  "No estés mal, ve a por un helado 🍦",
  "NO TE RINDAS",
  "Ánimo crack, que no se te caiga la corona 😎"
]

db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1) {
    db.set("encouragements", starterEncouragements)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

function updateEncouragements(encouragingMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragements(index) {
  db.get("encouragements").then(encouragements => {
  if (encouragements.length > index) {
    encouragements.splice(index, 1)
    db.set("encouragements", encouragements)
  }
  })
}

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then (data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return
  
  if(msg.content === "*inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  db.get("responding").then(responding => {
    if (responding && sadWords.some(word => msg.content.includes(word))) {
    db.get("encouragements").then(encouragements => {
      const encouragement = encouragements[Math.floor(Math.random() *
    encouragements.length)]
    msg.reply(encouragement)
    })
  }
  })                           

if (msg.content.startsWith("*new")) {
  encouragingMessage = msg.content.split("*new ")[1]
  updateEncouragements(encouragingMessage)
  msg.channel.send("Nuevo mensaje añadido.")
}

if (msg.content.startsWith("*del")) {
  index = parseInt(msg.content.split("*del ")[1])
  deleteEncouragements(index)
  msg.channel.send("Mensaje eliminado.")
}

if (msg.content.startsWith("*list")) {
  db.get("encouragements").then(encouragements => {
    msg.channel.send(encouragements)
  })
}

if (msg.content.startsWith("*responding")) {
  value = msg.content.split("*responding ")[1]

  if (value.toLowerCase() == "true") {
    db.set("responding", true)
    msg.channel.send("Responding is on.")
  } else {
    db.set("responding", false)
    msg.channel.send("Responding is off.")
  }
}
  
})

//MODERATION CODE
const prefix = '*';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log("Biggie is online!");
});

//Ban function
client.on('message', message => {

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'kick') {
  client.commands.get('kick').execute(message, args);
} else if(command === 'ban') {
    client.commands.get('ban').execute(message, args);
}
  
});

//Ban image function
client.on('guildBanAdd', (guild, user) => {
    if(guild.id === 'GuildID') {
        const notificationChannel = guild.channels.cache.find(c => c.name === 'general');
        notificationChannel.send('Message', {files: ['banImage.jpg']});
    }
});




keepAlive()
client.login(process.env.TOKEN);

    