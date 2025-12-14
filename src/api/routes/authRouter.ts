import { Router } from "express";
import dotenv from "dotenv";
import ApiService from "../../service/apiServiceImpl";
import { logger } from "../../util/logger";

dotenv.config();

class UserRouter {
  public router: Router;
  private api: ApiService;

  constructor() {
    this.router = Router();
    this.api = new ApiService(process.env.AUTH_SERVICE_URL!);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/create/user", (req, res) =>this.api.forwardPost(req, res, "/createUser"));
    this.router.post("/login", (req, res) =>this.api.forwardPost(req, res, "/create/jwt/token"));
    this.router.get('/find/all/sessions', (req, res) => this.api.forwardGet(req, res, '/getAll/auth/session'));
    this.router.post("/refresh/token", (req, res) =>this.api.forwardPost(req, res, "/refresh/token"));
    this.router.post("/logout", (req, res) =>this.api.forwardPost(req, res, "/session/logout"));
    
  }
}

export default new UserRouter();
