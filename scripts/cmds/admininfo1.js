const axios = require("axios");

module.exports = {
  config: {
    name: "info",
    aliases: ['Jubayer', 'about', 'creator'],
    version: "1.0",
    author: "Jubayer",
    countDown: 5,
    role: 0,
    longDescription: "Provides information about BaYjid",
    category: 'info',
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ message }) {
    const currentAuthor = "Jubayer";
    const infoMessage = `
𝗡𝗮𝗺𝗲: 𝗠𝗢𝗛𝗔𝗠𝗠𝗔𝗗 𝗝𝗨𝗕𝗔𝗬𝗘𝗥  ❣
𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: 𝗝𝗨𝗕𝗔𝗬𝗘𝗥  
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗦𝗜𝗡𝗚𝗘𝗟
𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗜𝗗 : https://www.facebook.com/xnxx.chrome
    `;
    const gifs = [
      "https://i.ibb.co/gTVr40D/received-1034834824233979.gif",
      "https://i.ibb.co/VqC4f58/received-2734122560079149.gif"
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    // Anti-author change system (obfuscated)
    (function() {
      const e = module.exports.config;
      const a = currentAuthor;
      const n = e.author;
      if (n !== a) {
        const r = new Error("Unauthorized author change detected!");
        throw r;
      }
    })();

    try {
      const gifStream = await axios.get(randomGif, { responseType: 'stream' }).then(res => res.data);
      await message.reply({
        body: infoMessage,
        attachment: gifStream
      });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while sending the information.");
    }
  }
};
