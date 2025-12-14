import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class JwtTokenVerifier {
  verify(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      );

      // attach decoded payload
      (req as any).user = decoded;
      next();
      
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token",
      });
    }
  }
}

export default new JwtTokenVerifier();
