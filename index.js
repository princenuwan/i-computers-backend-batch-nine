import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'

const mongoURI = "mongodb+srv://admin:1234@cluster0.tw807vg.mongodb.net/?appName=Cluster0"
mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Successfully connected to the mongo db")
    }
).catch(
    ()=>{
        console.log("not connected to the mongo db")
    }
)

//---EXPRESS SERVER SETUP---//
const app = express()

//---MIDDLEWARE---//
app.use(express.json())


//---IMPORTING ROUTERS---//
app.use("/user", userRouter)


//---TO START THE SERVER---//
function Start(){
    console.log("Server started on port 3000");
}

//---LISTEN TO THE SERVER---//
app.listen(3000, Start)

