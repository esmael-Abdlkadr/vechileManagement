import { User } from "../model/user";
import asyncHandler from "../utils/asyncHandler";
import { generateAccessToken } from "../utils/tokenutil";
import HttpError from "../utils/httpError";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types/custom";
export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return next(new HttpError("Please provide all fields", 400));
  }
  const userExist = await User.findOne({
    email,
  });
  if (userExist) {
    return next(new HttpError("User already exists", 400));
  }
  const user: any = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  const token = generateAccessToken(user._id.toString());
  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError("Please provide email and password", 400));
  }
  const user: any = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next(new HttpError("Invalid credentials", 401));
  }
  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return next(new HttpError("Invalid credentials", 401));
  }
  const token = generateAccessToken(user._id.toString());
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
export const protect = asyncHandler(
  async (req: IGetUserAuthInfoRequest, _res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new HttpError("You are not logged in! Please login to get access", 401)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as jwt.JwtPayload).id);
    if (!user) {
      return next(
        new HttpError(
          "The user belonging to this token does no longer exist",
          401
        )
      );
    }
    req.user = user;
    next();
  }
);
