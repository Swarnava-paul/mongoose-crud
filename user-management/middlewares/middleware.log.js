const fs = require('fs');

const trackRequestResponse = (req,res,next) =>{
 const {url,method} = req;
 const requestTimeStamp = Date.now();
 const requestTime = new Date()
 next();
 const responseTimeStamp = Date.now();
 const responseTimeTaken = `${responseTimeStamp-requestTimeStamp} ms`
 const responseStatus = res.statusCode;

 const result = `\n \n \n request url was ${url} method was ${method} 
 request Time was ${requestTime} Total time taken for response ${responseTimeTaken} 
 response Status ${responseStatus}`;

 fs.appendFile('./access.log',result,'utf-8',(error)=>{
    if(error) {
        console.log(error);
    }
 })
 
} // log req res status methods times etc.... in access.log file

module.exports = trackRequestResponse;