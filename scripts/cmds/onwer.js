const fs = require('fs');const moment = require('moment-timezone');
module.exports = {
  config: {
    name: "onwer",
    aliases: ["Onwer", "Own"],
    version: "2.0",
    author: "VEX_ADNAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "Onwer") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const botName = "⇛⌘ 𝐉𝐔𝐁𝐀𝐘𝐄𝐑 𝐑𝐎𝐁𝐎𝐓 𝐕 𝟐.𝟎 ⌘⇚";
    const botPrefix = "/";
    const authorName = "𝗝𝗨𝗕𝗔𝗬𝗘𝗥-𝟰𝟬𝟰";
    const authorFB = "https://m.me/xnxx.chrome";
    const authorInsta = "𝗫𝗻𝘅𝘅.𝗷𝘂𝗯𝗮𝘆𝗲𝗿";
    const status = "𝗣𝘂𝗿𝗲 𝗦𝗶𝗻𝗴𝗹𝗲";

    const urls = JSON.parse(fs.readFileSync('scripts/cmds/cache/jubayer.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}h ${minutes}m ${seconds}sec`;

    message.reply({
      body: `
≡≡║Bot & Owner Info║≡≡
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

♕︎ Bot Name↠ ${botName}

♕︎ Bot Prefix↠ ${botPrefix}

♕︎ Owner Name↠ ${authorName}

♕︎ Facebook↠ ${authorFB}

♕︎ Instagram↠ ${authorInsta}

♕︎ Status↠ ${status}

♕︎ Date↠ ${date}

♕︎ Time↠ ${time}

♕︎ Uptime↠ ${uptimeString}

﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋
Thanks for using ↠ \➪${botName}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  }
};
