import express from 'express';
import dotenv from 'dotenv';
import AppRouter from './api/routes/router';
import { logger } from './util/logger';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const appRouter = new AppRouter();
app.use(express.json());

app.use("/",appRouter.router);


app.listen(PORT,(error)=>{
     if(!error){
        logger.info(`Server is running on port ${PORT}`);
     } else {
        logger.error(`Error occurred: ${error.message}`);
     }
});

