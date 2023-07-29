# twitch-picture-catcher

Twitch viewers can use Channel Points to change the image or text, which you can set in OBS to update automatically.

1. Add relevant rewards to the channel (image | string)
2. Set **"fullLogging": true** in "config.json".
3. Send a message with a reward to the chat and find the **'custom-rewaed-id'** parameter in the logs and copy it.
4. Paste it into **config.json** with the appropriate parameters (**"imgRewardId": "5b0a15c5-e4f9-49a7-81d6-ad49e30edd63"**)
5. Save the config file and restart the app (now you can set **"fullLogging": false**)