const crypto = require('crypto');
const { Line_Secret, Line_Version, Line_Id } = process.env;

async function createHeaders(uri, lineBody) {
    const nonce = parseInt(Date.now().toString());
    const signature = crypto.createHmac('SHA256', Line_Secret)
        .update(`${Line_Secret}${Line_Version}${uri}${lineBody}${nonce}`)
        .digest('base64');

    const headers = {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': Line_Id,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': signature
    };
    return headers;
}

module.exports = { createHeaders };