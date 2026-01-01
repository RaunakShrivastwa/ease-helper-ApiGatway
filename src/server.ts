import express from 'express';
import dotenv from 'dotenv';
import AppRouter from './api/routes/router';
import { logger } from './util/logger';
import cors from 'cors';
import { redisClient } from './api/config/redis';
import { rateLimiter } from './api/middleware/ratelimiter';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const appRouter = new AppRouter();
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5500", // ❌ '*' mat use karna, exact frontend URL daalo
  credentials: true,               // 👈 Ye true hona hi chahiye
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(rateLimiter)

app.use("/",appRouter.router);


app.listen(PORT,(error)=>{
     if(error){
        logger.info(`Server is running on port ${PORT}`);
     } 
     startServer();
});

async function startServer(){
     logger.info(`Server running on ${PORT}`);
   //  await redisClient.connect();
}

