const axios = require("axios");

module.exports = {
  config: {
    name: "elisa",
    aliases: ["Rbt", "Robot"],
    version: "1.0",
    author: "Redwan | VEX_ADNAN",
    countDown: 5,
    role: 0,
    description: {
      vi: "Tự động tải video và chat AI",
      en: "Auto video download and chat teaching"
    },
    category: "AI",
    guide: {
      vi: "{pn} teach câu hỏi|trả lời hoặc {pn} chat",
      en: "{pn} teach question|answer or {pn} chat"
    }
  },

  onReply: async function ({ api, event, Reply }) {
    try {
      const replyMsg = event.body.trim();
      if (replyMsg) {
        const response = await axios.post(`https://adnan-simsimi-apis.onrender.com/chat`, {
          input: replyMsg,
          lang: "en"
        });
        const resText = response.data.response;
        await api.sendMessage(resText, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(`Error in reply: ${error.message}`);
      api.sendMessage("❗ An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const msg = args.join(" ").trim();
      if (!msg) {
        return api.sendMessage("Hello!I am Jubayer robot.\n \nHow can i assist you?", event.threadID, event.messageID);
      }

      if (args[0].toLowerCase() === "teach") {
        const input = msg.slice(5).trim();
        const parts = input.split('-');

        if (parts.length === 2) {
          const question = parts[0].trim();
          const answer = parts[1].trim();

          await axios.post(`https://adnan-simsimi-apis.onrender.com/teach`, {
            input: question,
            response: answer,
          });

          return api.sendMessage(
            `🎓 𝐊𝐧𝐨𝐰𝐥𝐞𝐝𝐠𝐞 𝐮𝐧𝐥𝐨𝐜𝐤𝐞𝐝! 𝐓𝐚𝐮𝐠𝐡𝐭: "${question}" — 𝐄𝐧𝐠𝐥𝐢𝐬𝐡𝐭𝐞𝐧𝐞𝐝 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞: "${answer}". 𝐘𝐨𝐮𝐫 𝐰𝐢𝐬𝐝𝐨𝐦 𝐬𝐡𝐢𝐧𝐞𝐬 𝐛𝐫𝐢𝐠𝐡𝐭𝐞𝐫 𝐭𝐡𝐚𝐧 𝐚 𝐬𝐮𝐩𝐞𝐫𝐧𝐨𝐯𝐚!`,
            event.threadID,
            event.messageID
          );
        } else {
          return api.sendMessage(
            "📚 𝐓𝐨 𝐬𝐡𝐚𝐫𝐞 𝐲𝐨𝐮𝐫 𝐰𝐢𝐬𝐝𝐨𝐦, 𝐮𝐬𝐞: teach [question] - [answer]. 𝐒𝐡𝐚𝐫𝐢𝐧𝐠 𝐢𝐬 𝐜𝐚𝐫𝐢𝐧𝐠!",
            event.threadID,
            event.messageID
          );
        }
      }

      const response = await axios.post(`https://adnan-simsimi-apis.onrender.com/chat`, {
        input: msg,
        lang: "en",
      });

      const resText = response.data.response;
      await api.sendMessage(resText, event.threadID, event.messageID);

    } catch (error) {
      console.error(`Error in start: ${error.message}`);
      api.sendMessage("❗ An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
};
