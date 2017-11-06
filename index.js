const express = require('express');
const linebot = require('linebot');

const bot = linebot({
    channelId: LINE_BOT_CHANNEL_ID,
    channelSecret: LINE_BOT_CHANNEL_SECRET,
    channelAccessToken: LINE_BOT_CHANNEL_TOKEN
});

const port = process.env.PORT || 3000;
const app = express();
app.post('/webhook', bot.parser());

function reverseString(str) {
    return str.split("").reverse().join("");
}

bot.on('message', (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return;
    }

    const original = event.message.text;
    const reversed = reverseString(original);

    event.reply({ type: 'text', text: reversed});
});

app.listen(port, () => {
    console.log("Connected to port ${port}");
});
