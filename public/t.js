const fs = require('fs');
const path = require('path');

let a = fs.readdirSync(path.join(__dirname, 'model'));

console.log(a);
