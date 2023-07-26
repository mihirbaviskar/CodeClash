const decodeBase64 = (base64String) => {
    if (base64String === null) return "";
    return Buffer.from(base64String, 'base64').toString('utf8');
}

module.exports = decodeBase64;