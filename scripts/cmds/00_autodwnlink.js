const fs = require("fs-extra");
const axios = require("axios");

module.exports = {

	threadStates: {},

	config: {
		name: 'autotik',
		version: '1.0',
		author: 'Kshitiz', //fixed by cliff
		countDown: 5,
		role: 0,
		shortDescription: 'auto video downloader',
		longDescription: '',
		category: 'media',
		guide: {
			en: '{p}{n}',
		}
	},
	onStart: async function ({ api, event }) {
		const threadID = event.threadID;

		if (!this.threadStates[threadID]) {
			this.threadStates[threadID] = {
				autoTikEnabled: false,
			};
		}

		if (event.body.toLowerCase().includes('autotik')) {

			if (event.body.toLowerCase().includes('on')) {
				this.threadStates[threadID].autoTikEnabled = true;
				api.sendMessage("AutoTik is now ON.", event.threadID, event.messageID);
			} else if (event.body.toLowerCase().includes('off')) {
				this.threadStates[threadID].autoTikEnabled = false;
				api.sendMessage("AutoTik is now OFF.", event.threadID, event.messageID);
			} else {
				api.sendMessage("type 'autotik on' to turn on and\n'autotik off' to turn off.", event.threadID, event.messageID);
			}
		}
	},
	onChat: async function ({ api, event }) {
		const threadID = event.threadID;

		if (this.threadStates[threadID] && this.threadStates[threadID].autoTikEnabled && this.checkLink(event.body)) {
			var { url } = this.checkLink(event.body);
			this.downLoad(url, api, event);
			api.setMessageReaction("💐", event.messageID, (err) => {}, true);
		}
	},
	downLoad: function (url, api, event) {
		var time = Date.now();
		var path = __dirname + `/cache/${time}.mp4`;
		this.getLink(url).then(res => {
			axios({
				method: "GET",
				url: res,
				responseType: "arraybuffer"
			}).then(res => {
				fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
				if (fs.statSync(path).size / 1024 / 1024 > 25) {
					return api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(path), event.messageID);
				}
				api.sendMessage({
					body: "Successful Download!",
					attachment: fs.createReadStream(path)
				}, event.threadID, () => fs.unlinkSync(path), event.messageID);
			}).catch(err => console.error(err));
		}).catch(err => console.error(err));
	},
	getLink: function (url) {
		return new Promise((resolve, reject) => {
			axios({
				method: "GET",
				url: `https://api.nayan-project.repl.co/tiktok/downloadvideo?url=${url}`
			}).then(res => resolve(res.data.data.play)).catch(err => reject(err));
		});
	},
	checkLink: function (url) {
		if (url.includes("tiktok")) {
			return {
				url: url
			};
		}
		return null;
	}
};
