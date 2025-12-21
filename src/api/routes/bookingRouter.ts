import { Router } from "express";
import dotenv from "dotenv";
import ApiService from "../../service/apiServiceImpl";
import verifyToken from "../auth/verifyToken";

dotenv.config();

class BookingRouter {
  public router: Router;
  private api: ApiService;

  constructor() {
    this.router = Router();
    this.api = new ApiService(process.env.BOOKING_SERVICE_URL!);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/create", (req, res) =>this.api.forwardPost(req, res, "/create"));
    this.router.get('/getAll',(req, res) => this.api.forwardGet(req, res, '/get/all/created/bookings'));
    this.router.get("/:id", (req, res) => this.api.forwardGetByID (req, res, `/find/bookingby/${req.params.id}`));
    this.router.delete("/:id", (req, res) => this.api.forwardDelete (req, res, `/delete/bookingby/${req.params.id}`));
    this.router.put("/:id", (req, res) => this.api.forwardPut (req, res, `/update/resource/${req.params.id}`));
    
  }
}

export default new BookingRouter();
