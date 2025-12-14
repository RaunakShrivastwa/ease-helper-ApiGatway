import { Router } from 'express';
import dotenv from 'dotenv';
import ApiService from '../../service/apiServiceImpl';
import { logger } from '../../util/logger';
import verifyToken from '../auth/verifyToken';

dotenv.config();

class UserRouter {
  public router: Router;
  private api: ApiService;

  constructor() {
    this.router = Router();
    this.api = new ApiService(process.env.USER_SERVICE_URL!);
    logger.info("User Router initialized");
    this.initializeRoutes();
  }

  private initializeRoutes() {
  this.router.get("/",  verifyToken.verify ,  (req, res) => this.api.forwardGet   (req, res, "/all/list"));
  this.router.post("/",     (req, res) => this.api.forwardPost  (req, res, "/create"));
  this.router.put("/:id",   (req, res) => this.api.forwardPut   (req, res, `/${req.params.id}`));
  this.router.get("/:id",   (req, res) => this.api.forwardGetByID   (req, res, `/${req.params.id}`));
  this.router.patch("/:id", (req, res) => this.api.forwardPatch (req, res, `/patch/${req.params.id}`));
  this.router.delete("/:id",(req, res) => this.api.forwardDelete(req, res, `/${req.params.id}`));
  this.router.get("/email/:email", (req, res) => this.api.forwardGetByEmail(req, res, `/find/email/${req.params.email}`));
}

}

export default new UserRouter();
