"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const logger_1 = require("../../util/logger");
const authRouter_1 = __importDefault(require("./authRouter"));
const bookingRouter_1 = __importDefault(require("./bookingRouter"));
const verifyToken_1 = __importDefault(require("../auth/verifyToken"));
class AppRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        logger_1.logger.info('Main Router initialized');
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Define routes for user, auth, and booking
        this.router.use("/user", userRouter_1.default.router);
        this.router.use("/auth", authRouter_1.default.router);
        this.router.use('/booking', verifyToken_1.default.verify, bookingRouter_1.default.router);
        // Custom 404 handler for undefined routes
        this.router.use((req, res, next) => {
            res.status(404).json({
                success: false,
                message: `Route '${req.originalUrl}' not found.`,
            });
        });
        // Optional: Error handler for other types of errors (like server errors)
        this.router.use((err, req, res, next) => {
            logger_1.logger.error(err.stack); // Log the error stack
            res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again later.",
            });
        });
    }
}
exports.default = AppRouter;
