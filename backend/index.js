const express=require("express")
const mongoose=require("mongoose")
const app=express()
const port=8000
const MongoClient = require('mongodb').MongoClient;
const db=require("./db")
db()
const createuser =require("./routes/CreateUser")
const Displaydata=require("./routes/Displaydata")
const orderdata=require("./routes/Orderdata")

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"

    );
    next()
})
app.use(express.json())


app.use("/api/",createuser)
app.use("/api/",Displaydata)
app.use("/api/",orderdata)

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.listen(port,()=>{
    console.log("server is working")
})