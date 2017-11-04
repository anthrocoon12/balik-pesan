const express = require('express');
const linebot = require('linebot');

const bot = linebot({
    channelId: '1544350935',
    channelSecret: '76fa6f1b37c57a898a39ce3c78e5f47e',
    channelAccessToken: 'ejJRFDIrG8d8LtL4fQvn3uc9BtWor47VUhypU/zyeb3Y9PBDBoKMMQCnPe17xvIxhs9cMIgV09YLt4V8tqnY4PKe+4+Vtcxy5cv+D1Qw6VsqTH1kLM/Ty61wiVo490vvM9ptW/vDHG5A7IX7mUU7twdB04t89/1O/w1cDnyilFU='
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