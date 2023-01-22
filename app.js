const express= require("express");
const mongoose = require('mongoose');
const postModel= require('./Model/postModel')
const postRoute= require("./routes/postRoute")
var cors = require('cors')

const uri=`mongodb+srv://pratiktalware:12345@cluster0.iafvuz9.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', true);

mongoose.connect(uri, (err)=>{
  if(err){
    console.log("Connection failed with mongoDB")
  }else{
    console.log("connection successful with mongodb")
  }
})


const app= express();
app.use(cors())
const port= 8080 || process.env.PORT;

app.use("/", cors(), postRoute)

app.listen(port, ()=>console.log(`app is running on port ${port}`))