import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import mongoose from "mongoose";
import {DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE} from "./app/config/config.js";

import router from "./routes/api.js";

const app = express();

// App Use Default Middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet())

// App Use Limiter
const limiter=rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter)


// Cache
app.set('etag',WEB_CACHE)

// Database Connect

// Create a mongoDB Atlas Account AND GET Database Connection String
let URI="mongodb+srv://prac25:prac25@cluster0.zhalbrt.mongodb.net/";
let option={user:'',pass:'',autoIndex:true}
//let URL="mongodb://localhost:27017/ecom4"
//let option={user:'',pass:"",autoIndex:true};
mongoose.connect(URI,option).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})


app.use("/api",router)

app.listen(PORT,()=>{
    console.log("Server started on port "+PORT)
})