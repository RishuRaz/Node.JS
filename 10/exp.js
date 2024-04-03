const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    return res.send("Hello From Home Page")
})

app.get('/about',(req,res)=>{
    return res.send(`Hello ${req.query.name}`)
})

app.listen(5000,()=> console.log("server started"))