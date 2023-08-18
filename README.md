# twitch-picture-catcher

Quick download: https://github.com/MaxFrolikov/twitch-picture-catcher/releases/download/twitch-picture-catcher-win/twitch-picture-catcher-v1.0.1.zip

if yous see "ERROR: No response from Twitch." check your **channel-name** parameter 

Twitch viewers can use Channel Points to change the image or text, which you can set in OBS to update automatically.

1. Set your channel-name in **config.json** file.
2. Add relevant rewards to the channel (image | string)
3. Set **"fullLogging": true** in **config.json**.
4. Send a message with a reward to the chat and find the **'custom-rewaed-id'** parameter in the logs and copy it.
5. Paste it into **config.json** with the appropriate parameters (**"imgRewardId": "5b0a15c5-e4f9-49a7-81d6-ad49e30edd63"**) https://imgur.com/lPND0uQ
7. Save the config file and restart the app (now you can set **"fullLogging": false**)

## config.json

	"channel": "channel-name",
Your channel name
 

	"imgRewardId": "5b0a15c5-e4f9-49a7-81d6-ad49e30edd63",
	"txtRewardId": "ef301a90-6a62-48a3-b0f0-817176b0dd25",
IDs for image/text reward (see point 3-5)

    
	"txtName": "tempText",
	"spaceCount": 3,
Name for .txt file and number of spaces after


	"imgName": "tempImage",
	"imgType": "png",
Name for image file & file format (.png | .jpg)


	"height": 800,			
	"width": 800,               
Height and width of resized

 
	"fit": "contain",
Fit-type for resized image:
https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/api-resize-fit.svg

 
	"position": "top left",
Fit-position for resized image
centre, top, right top, right, right bottom, bottom, left bottom, left, left top.
(   ^ )

 	"fullLogging": false,
Set "true" to resive all information about every message

