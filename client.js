const { Client } = require("discord.js");
const { channels, staffRoles, unregisterRoles, welcomeSound, staffSound } = require("./settings.json");
const tokens = process.env.TOKENS.split(" ");

//TOKEN 1
 tokens.forEach((token, i) => {
  const client = new Client();
  let connection;
  client.on("ready", async () => connection = await client.channels.cache.get(channels[i]).join());
    
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.channelID && !newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID === newState.channelID) || newState.member.user.bot || newState.channelID !== channels[i]) return;
    const hasStaff = newState.channel.members.some((x)=> staffRoles.some((r) => x.roles.cache.has(r)));
    const staffSize = newState.channel.members.filter((x) => staffRoles.some((r) => x.roles.cache.has(r))).size;
    const unregisterSize = newState.channel.members.filter((x) => unregisterRoles.some((r) => x.roles.cache.has(r))).size;
    if (!hasStaff && unregisterSize === 1) await connection.play(welcomeSound);
    else if (hasStaff && staffSize === 1 && unregisterSize === 1) await connection.play(staffSound);
  });

  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "MKA ❤️ ZeGa" }, status: "idle" });
  })
  client.login("OTk1NzUwNzM5MDAxNDc1MTEz.GTU0jA.eaxTaZAUUicSUJCt_xCniwq9eYl766CV8lr3kM").then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} Tokeni aktif edilemedi!`));
});