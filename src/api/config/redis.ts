import { createClient } from "redis";
import { logger } from "../../util/logger";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  logger.info(`redis connected`)
});

redisClient.on("error", (err) => {
  logger.error(`error with redis ${err}`)
});

redisClient.connect();

