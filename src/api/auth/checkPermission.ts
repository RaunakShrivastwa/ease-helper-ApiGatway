import { NextFunction, Request, Response } from "express";
class CheckPermission {

    async checkPermission(req: Request, res: Response,next: NextFunction) {
        try {
            let user = (req as any).user;
            if (user.role === 'ADMIN') next();
            else if (user.sub == req.params.id) next();
            else return res.status(403).json({ Error: `You dont have permission for this operation with id ${req.params.id}` })
        } catch (error) {
            return res.status(403).json({ message: "Unauthorized" });
        }
    }
}
export default new CheckPermission();
