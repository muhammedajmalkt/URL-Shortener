import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import urlRouter from "../src/routes/urlRoutes.js"

const app = express()
// app.use(cors())
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongoose connected"))
.catch((err)=>console.log(err) )

app.use("/api/url",urlRouter)

app.listen(process.env.PORT || 2000 , ()=>{
    console.log("Server running");
    
})
