const fs = require('node:fs');

const accessInfo = (req,res,next) => {
const {url,method,status} = req;
const requestDateAndTime = Date.now();
const log = `/n/n Url is ${url} method is ${method} status is ${status} request Time at ${requestDateAndTime}`
fs.appendFileSync('../access.log',log);
 next();
}

module.exports = accessInfo;
//const log = require('../accesslog/access.log')