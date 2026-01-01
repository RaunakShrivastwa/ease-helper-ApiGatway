import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redisClient } from "../config/redis";

export const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redisClient.sendCommand(args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 5,             // 5 requests per minute
  message: {
    message: "Too many requests, slow down bhai 😄",
  },
});
