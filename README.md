# twitch-picture-catcher

Quick download: https://github.com/MaxFrolikov/twitch-picture-catcher/releases/download/win/twitch-picture-catcher-v1.0.1.zip

Twitch viewers can use Channel Points to change the image or text, which you can set in OBS to update automatically.

1. Set your channel-name in **config.json** file.
2. Add relevant rewards to the channel (image | string)
3. Set **"fullLogging": true** in **config.json**.
4. Send a message with a reward to the chat and find the **'custom-rewaed-id'** parameter in the logs and copy it.
5. Paste it into **config.json** with the appropriate parameters (**"imgRewardId": "5b0a15c5-e4f9-49a7-81d6-ad49e30edd63"**) https://imgur.com/lPND0uQ
7. Save the config file and restart the app (now you can set **"fullLogging": false**)

Types for img fit: https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/api-resize-fit.svg

if yous see "error: No response from Twitch." check your **channel-name** parameter 
