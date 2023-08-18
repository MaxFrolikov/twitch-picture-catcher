console.log('Starting...\n')

const redLog = '\x1b[31m'
const greenLog = '\x1b[32m'

const customLog = (type, param, text) => {
	console.log(`${type} | ${(new Date).toLocaleTimeString()} |  ${param} ${text}\x1b[0m`)
}

const fs = require('fs');
const tmi = require('tmi.js');
const https = require ('https');
const sharp = require('sharp');

console.log('ReadingConfig...')
const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf8', flag: 'r' }))
const fileName = `${config.imgName}.${config.imgType}`

const preLog =`
- channel: ${config.channel }
- imgRewardId: ${config.imgRewardId }
- txtRewardId: ${config.txtRewardId }

- txtFile: ${config.txtName}.txt
- spaceCount: ${config.spaceCount }

- imgFile: ${fileName}
- resized: ${config.imgName}Resized.${config.imgType}
- size: ${config.height } x ${config.width }
- fit: ${config.fit}
- position: ${config.position}

- fullLogging: ${config.fullLogging }
`

console.log(preLog.replaceAll(': ', ': \x1b[34m').replaceAll('\n', '\n\x1b[0m'))

console.log(
`Types for img Fit can be found there: \x1b[33m
https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/api-resize-fit.svg \n\x1b[0m
More info at: \x1b[33m
https://github.com/MaxFrolikov/twitch-picture-catcher/blob/main/README.md \n\x1b[0m`
)

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true,
	},
	channels: [config.channel],
})

client.connect().then(() =>	console.log('started'));

client.on('message', (channel, tags, message, self) => {

	if(config.fullLogging) {
		console.log(channel, tags, message, self)
	}

	if(tags['custom-reward-id'] === config.imgRewardId) {
		customLog('img', '', `${tags['display-name']}: ${message}`)
		
		try {https.get(message, response => {
			const file = fs.createWriteStream(fileName)
			response.pipe(file);

			file.on('finish', () => {
				file.close();
					sharp(fileName)
					.resize({
						height: config.height,
						width: config.width,
						fit: config.fit,
						position: config.position,
						background: {r: 0,g: 0,b: 0,alpha: 0}
					})
					.toFile(`${config.imgName}Resized.${config.imgType}`)
					.catch((err) => {
						customLog('img', redLog, 'No img found')
						return
					})
					.then(info => {if(info) customLog('img', greenLog, `Resiesd ${info.format} updated`)})
			});
		})} catch (err) {
			customLog('img', redLog, 'No Link')
		}
	}



	if(tags['custom-reward-id'] === config.txtRewardId) {
		customLog('txt', '', `${tags['display-name']}: ${message}`)
		
		let textToWrite = message
		for(let i = 0; i < config.spaceCount; i++){
			textToWrite += ' '
		}
		fs.writeFileSync(`${config.txtName}.txt`, textToWrite)
		customLog('txt', greenLog, 'Text file Updated')
		
		return
	}
});