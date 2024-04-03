const express = require('express')
// const users = require('./MOCK_DATA.json')
const fs = require('fs')
const mongoose = require("mongoose")
const app = express()

//connection
mongoose.connect("mongodb://127.0.0.1:27017/products").then(()=> console.log("mongodb connected")).catch(err => console.error("mongoo error", err))

//Routes
app.get("/users",async(req,res)=>{
    const allDbUsers = await User.find({})
    const html = `<ul>
     ${allDbUsers.map((user)=> `<li>${user.firstName} - ${user.email} </li>`).join("")}
     </ul>` 
     res.send(html);
})

//Rest API
app.get("/api/users", async(req,res)=>{
    const allDbUsers = await User.find({})
// always add x to custom header
    res.setHeader("x-MyName","Rishu Raj")//custom header
    return res.json(allDbUsers)

})
 
app.get('/api/users/:id', async(req,res)=>{
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    return res.json(user);
})

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true});

const User = mongoose.model("user",userSchema)

app.use(express.urlencoded({ extended: false}))

// app.use((req,res,next)=>{
//     console.log("middleware started")
//     // res.end("Middleware Ended");
//     next();
// })

// app.get('/api/users',(req,res)=>{
//     return res.json(users)
// }) 




// app.post('/api/users',(req,res)=>{
//     const body = req.body
//     users.push(({...body, id: users.length + 1}))
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         return res.json({status:"pending", id: users.length})
//     })  
// })

app.post("/api/users", async(req,res)=>{
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(404).json({msg:"All fields are required"})
    }

   const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender:  body.gender,
        jobTitle: body.job_title

    })

    console.log("result",result)
return res.status(201).json({msg:"sucess"})
})



app.listen(8080,()=> console.log("server started on 8080"))


