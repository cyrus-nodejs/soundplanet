
import 'dotenv/config'
import express, {Request, Response} from "express"
import session from 'express-session'
import MongoStore from 'connect-mongo'
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression"
import bodyParser from "body-parser";
import cors from "cors";
import {connectDB} from '../models/connectDB';
import passport from "../middlewares/passport/index";
import cookieParser from 'cookie-parser';

import authRoutes from "../routes/Auth"
import playedRoutes from "../routes/Played"
import playListRoutes from "../routes/Playlist"
import songRoutes from "../routes/Song"
import orderRoutes from "../routes/Order"
import priceRoutes from "../routes/Pricing"
import adminRoutes from '../routes/Admin'
import path from 'path';









const app = express();

app.use(cookieParser());
app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
 app.use(express.json());

 


const corsOptions = {
  origin: process.env!.FRONTEND_URL,
  credentials: true, 
  optionSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
 
}


app.use(cors(corsOptions))
app.set('trust proxy', 1) 
 app.use(
	session({
    name:process.env.SESSION_NAME!,
		secret:process.env.SESSION_SECRET!, //pick a random string to make the hash that is generated secure
		store: MongoStore.create({mongoUrl:process.env.MONGO_URL }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
       httpOnly: true, sameSite: "none", secure: true 
   },
		saveUninitialized: false ,//required
    resave: false, //required
   
	})
)
app.use(passport.initialize()); 
app.use(passport.session());




app.use("/", authRoutes );
app.use("/", orderRoutes)
app.use("/", playedRoutes)
app.use("/", playListRoutes)
app.use("/", songRoutes)
app.use("/", priceRoutes)
app.use("/", adminRoutes)




const startServer  = async () => {
  try{
await connectDB(process.env.MONGO_URL);
}catch (err){
  console.log(err)
}


}

app.get("/", (req:Request, res:Response)=>{
  res.sendFile(path.join(__dirname, '../../public/index.html'));
})

startServer();
 const server = app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
 
 server.keepAliveTimeout = 110 * 1000;
 server.headersTimeout = 120 * 1000;
   
