const puppeteer = require('puppeteer')
const browserFetcher = puppeteer.createBrowserFetcher();
const MAX_WSE = 2; //启动几个浏览器 
let WSE_LIST = []; //存储browserWSEndpoint列表

(() => {
	for (var i = 0; i < MAX_WSE; i++) {
		browserFetcher.download("809590").then(async (res) => {
			const browser = await puppeteer.launch({
				executablePath: res.executablePath, //chrome执行路径
				headless: true, //浏览器无头模式
				args: [
					'--disable-gpu',
					'--disable-dev-shm-usage',
					'--disable-setuid-sandbox',
					'--no-first-run',
					'--no-sandbox',
					'--no-zygote',
					'--single-process'
				]
			});
			browserWSEndpoint = await browser.wsEndpoint();
			WSE_LIST.push(browserWSEndpoint);
		});
	}
})();

module.exports = WSE_LIST