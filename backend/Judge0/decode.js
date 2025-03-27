const decodeBase64 = (base64String) => {
    if (base64String === null) return "";
    return Buffer.from(base64String, 'base64').toString('utf8');
}

const decodeOutput = (stdout) => {
    let lastOccurrence = stdout.lastIndexOf("$***************************************$");
    let result = stdout.substring(lastOccurrence + "$***************************************$".length+1);
    // essentially just get everything after the marker which is what they printed.
    return result;
}

module.exports = {
    decodeBase64,
    decodeOutput
};