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

export const ChangePassword = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;
    if (!req.user) {
      return next(new HttpError("User not found", 404));
    }
    const user: any = await User.findById(req.user.id).select("+password");
    if (
      !user ||
      !(await user.comparePassword(currentPassword, user.password))
    ) {
      return next(new HttpError("Your current password is wrong", 400));
    }
    user.password = newPassword;
    // check if new password is the same as the old password.
    if (user.password === currentPassword) {
      return next(
        new HttpError(
          "Your new password cannot be the same as the old password",
          400
        )
      );
    }

    await user.save();
    const accessToken = generateAccessToken(user._id.toString());
    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
      accessToken,
    });
  }
);
export const myInfo = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    if (!req.user) {
      return next(new HttpError("User not found", 404));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    const populatedUser = await User.findById(user._id);
    res.status(200).json({
      status: "success",
      user: populatedUser,
    });
  }
);
export const updateMe = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    // create error if user POSTs password data.
    if (req.body.password) {
      return next(
        new HttpError(
          "This route is not for password updates. Please use /updateMyPassword",
          400
        )
      );
    }
    if (!req.user) {
      return next(new HttpError("User not found", 404));
    }
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: updateUser,
    });
  }
);
export const deleteme = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    if (!req.user) {
      return next(new HttpError("User not found", 404));
    }
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// ADMIN  CONTROLLERS.
export const getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HttpError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    user,
  });
});
export const getUserByEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    return next(new HttpError("No user found with that email", 404));
  }
  res.status(200).json({
    status: "success",
    user,
  });
});
// export const assignRoleToUser = asyncHandler(async (req:IGetUserAuthInfoRequest, res, next) => {
//   const { userId } = req.params;
//   const { roleId } = req.body;
//   const user = await User.findById(userId);
//   if (!user) {
//     return next(new HttpError("No user found with that ID", 404));
//   }
//   const role = await Role.findById(roleId);
//   if (!role) {
//     return next(new HttpError("No role found with that ID", 404));
//   }
//   //  update user role.
//   // user.role = role;
//   await user.save();
//   res.status(200).json({
//     status: "success",
//     message: "Role assigned to user successfully",
//     user,
//   });
// });
