console.log('starting')

const fs = require('fs');
const tmi = require('tmi.js');
const https = require ('https');
const sharp = require('sharp');

console.log('ReadingConfig')

const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf8', flag: 'r' }))

const fileName = `${config.imgName}.${config.imgType}`

console.log(config)

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true,
	},
	channels: [config.channel],
});
;

client.connect();
console.log('started')


client.on('message', (channel, tags, message, self) => {

	if(config.fullLogging) {
		console.log(channel, tags, message, self)
	}

	if(tags['custom-reward-id'] === config.imgRewardId) {
		
		console.log(`img | ${(new Date).toLocaleTimeString()} | ${tags['display-name']}: ${message}`)
		
		const last = message.split('.')[message.split('.').length - 1]
		if(last !== 'png' && last !== 'jpg') {
			console.log('Invalid Link')
			return
		}
		
		https.get(message, response => {
			const file = fs.createWriteStream(fileName)
			console.log('Creaing file')
			response.pipe(file);
			console.log('Writing file', fileName)
			file.on('finish', () => {
				file.close();
				sharp(fileName)
					.resize({
						height: config.height,
						width: config.width,
						fit: 'contain',
						background: {r: 0,g: 0,b: 0,alpha: 0}
					})
					.toFile(`${config.imgName}Resized.${config.imgType}`)
					.then((console.log('Resized file Updated')))
			});
		}).on('error', err => {
			console.error(`Error downloading image: ${err.message}`);
		});
		return
	}



	if(tags['custom-reward-id'] === config.txtRewardId) {
		console.log(`txt | ${(new Date).toLocaleTimeString()} | ${tags['display-name']}: ${message}`)
		
		let textToWrite = message
		for(let i = 0; i < config.spaceCount; i++){
			textToWrite += ' '
		}
		fs.writeFileSync(`${config.txtName}.txt`, textToWrite)
		console.log('Text file Updated')
		
		return
	}
});