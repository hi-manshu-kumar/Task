const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const csvData = () => {
    const results = [];
    console.log(path.join(__dirname, '../../uploads/file.csv'));
    fs.createReadStream(path.join(__dirname, '../../uploads/file.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
        return results;
    });
}

module.exports = csvData;


