const decodeBase64 = (base64String) => {
    if (base64String === null) return "";
    return Buffer.from(base64String, 'base64').toString('utf8');
}

const decodeOutput = (stdout) => {
    let lastOccurrence = stdout.lastIndexOf("$***************************************$");
    let result = stdout.substring(lastOccurrence + "$***************************************$".length+2);
    return result;
}

module.exports = {
    decodeBase64,
    decodeOutput
};