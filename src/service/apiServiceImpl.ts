import { Request, Response } from "express";
import axios from "axios";
import ApiService from "./apiService";
import responseError from "../error/responseError";

export default class ApiServiceImpl implements ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // GET BY ID (Optional method)
  public forwardGetByID = async (req: Request, res: Response, apiPath: string) => {
    try {
      const response = await axios.get(`${this.baseUrl}${apiPath}`);
      return res.json(response.data);
    } catch (err) {
      return responseError.responseError(res, err);
    }
  };

// GET
public forwardGet = async (req: Request, res: Response, apiPath: string) => {
  try {
    const response = await axios.get(`${this.baseUrl}${apiPath}`, {
      params: { text: req.query.text } ,
      headers: req.headers
        // Corrected to send the 'text' as a query parameter
    });
    
    return res.json(response.data);
  } catch (err) {
    return responseError.responseError(res, err);
  }
};


  public forwardPost = async (req: Request, res: Response, apiPath: string) => {
    try {
      const response = await axios.post(`${this.baseUrl}${apiPath}`, req.body, {
        headers: {
          cookie: req.headers.cookie || "",
          authorization: req.headers.authorization || "",
        },
        withCredentials: true,
      });

      const refreshToken = response.data.newRefreshToken || response.data.refreshToken;
      if (refreshToken) {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
      }

      if(response.data.isRefresh){
        return res.status(response.status).json({token:response.data.token});
      }

      // for the logout response
      if (response.data.isLogout) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        return res.status(response.status).json({ message: "Logged out successfully" });
      }

      if(response.data.token){
        const { password, ...newUser } = response.data.user;
          return res.status(response.status).json({token:response.data.token,user:newUser});
      }

       return res.status(response.status).json(response.data);
    } catch (err: any) {
      return responseError.responseError(res, err);
    }
  };

  // PUT
  public forwardPut = async (req: Request, res: Response, apiPath: string) => {
    try {
      const response = await axios.put(`${this.baseUrl}${apiPath}`, req.body,{
        headers: {
          authorization: req.headers.authorization || "",
        }
      });
      return res.json(response.data);
    } catch (err) {
      return responseError.responseError(res, err);
    }
  };

  // PATCH
  public forwardPatch = async (
    req: Request,
    res: Response,
    apiPath: string
  ) => {
    try {
      const response = await axios.patch(
        `${this.baseUrl}${apiPath}`,
        req.body,
        {
          headers: req.headers,
        }
      );

      console.log(response);
      
      return res.json(response.data);
    } catch (err) {
       return responseError.responseError(res, err);
    }
  };

  // DELETE
  public forwardDelete = async (
    req: Request,
    res: Response,
    apiPath: string
  ) => {
    try {
      const response = await axios.delete(`${this.baseUrl}${apiPath}`, {
        headers: req.headers,
      });
      return res.json(response.data);
    } catch (err) {
      return responseError.responseError(res, err);
    }
  };

  // GET BY EMAIL (Optional method)
  public forwardGetByEmail = async (req: Request, res: Response, apiPath: string) => {
    try {
      const response = await axios.get(`${this.baseUrl}${apiPath}`);
      return res.json(response.data);
    } catch (err) {
      return responseError.responseError(res, err);
    }
  }

}
