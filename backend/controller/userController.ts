import User from "../model/user";
import asyncHandler from "../utils/asyncHandler";
import { generateAccessToken } from "../utils/tokenutil";
import HttpError from "../utils/httpError";
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
    return next(new HttpError("Please provide all fields", 400));
  }
  const user: any = await User.findOne({
    email,
  }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new HttpError("Invalid credentials", 401));
  }
  const token = generateAccessToken(user._id.toString());
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
