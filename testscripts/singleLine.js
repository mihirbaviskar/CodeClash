const fs = require('fs');

fs.readFile('convert.txt', 'utf8', function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    let singleLine = lines.join('\\n');
    singleLine = singleLine.replace(/"/g, '\\"'); // escape double quotes
    console.log(singleLine);
});