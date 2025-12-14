import { Router } from 'express';
import userRouter from './userRouter';
import { logger } from '../../util/logger';
import authRouter from './authRouter';

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    logger.info('Main Router initialized');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.use("/user",userRouter.router);
    this.router.use("/auth",authRouter.router);
   
  }
}
