import { Request, Response } from "express";

export default interface ApiService {
  forwardGet(req: Request, res: Response, apiPath:string): Promise<any>;
  forwardPost(req: Request, res: Response, apiPath:string): Promise<any>;
  forwardPut(req: Request, res: Response, apiPath:string): Promise<any>;
  forwardPatch(req: Request, res: Response, apiPath:string): Promise<any>;
  forwardDelete(req: Request, res: Response, apiPath:string): Promise<any>;
  forwardGetByID(req: Request, res: Response, apiPath:string): Promise<any>;
  
}
