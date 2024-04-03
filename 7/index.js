const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req,res)=>{
    const log = (`${Date.now()}: ${req.url} New Req Received\n`)
    fs.appendFile("log.txt", log,(err,data)=>{
        // res.end("hello from server")
        switch(req.url){
            case "/":
                res.end("HomePage")
            break;
            case "/about":
                res.end("Hello I am Rishu Raj")
            break;
            default:
                res.end("404 not found")

        }
    })
    
}).listen(8080,()=> console.log("server started"))