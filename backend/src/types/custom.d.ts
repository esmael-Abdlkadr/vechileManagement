import { IUser } from "../model/user";
import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser;
}
