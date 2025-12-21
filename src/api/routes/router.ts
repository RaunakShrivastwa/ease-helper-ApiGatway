import { Router } from 'express';
import userRouter from './userRouter';
import { logger } from '../../util/logger';
import authRouter from './authRouter';
import bookingRouter from './bookingRouter';
import verifyToken from '../auth/verifyToken';

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    logger.info('Main Router initialized');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Define routes for user, auth, and booking
    this.router.use("/user", userRouter.router);
    this.router.use("/auth", authRouter.router);
    this.router.use('/booking', verifyToken.verify, bookingRouter.router);

    // Custom 404 handler for undefined routes
    this.router.use((req, res, next) => {
      res.status(404).json({
        success: false,
        message: `Route '${req.originalUrl}' not found.`,
      });
    });

    // Optional: Error handler for other types of errors (like server errors)
    this.router.use((err: any, req: any, res: any, next: any) => {
      logger.error(err.stack); // Log the error stack
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
  }
}
