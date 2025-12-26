import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

class JwtTokenVerifier {
  private publicKey: string | null = null;

  private async getPublicKey(): Promise<string> {
    if (this.publicKey) return this.publicKey;
    try {
      const keyPath = path.join(__dirname, '../../../key/access-public.key');
      this.publicKey = await fs.readFile(keyPath, "utf8");
      return this.publicKey;
    } catch (error) {
      console.error("Error reading public key:", error);
      throw new Error("Could not load public key");
    }
  }

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const key = await this.getPublicKey();

      const decoded = jwt.verify(token, key, {
        algorithms: ["RS256"], // Note: 'algorithms' (plural) array hota hai
        issuer: "auth-service",
        audience: "api-gateway",
      });

      (req as any).user = decoded;
      next();
      
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token",
      });
    }
  }
}

export default new JwtTokenVerifier();