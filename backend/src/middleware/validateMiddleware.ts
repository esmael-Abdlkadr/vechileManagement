import joi from "joi";
import HttpError from "../utils/httpError";
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

interface ValidateMiddleware {
  (schema: Schema): (req: Request, res: Response, next: NextFunction) => void;
}

const validate: ValidateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); // Capture all errors
  if (error) {
    const errMessage = error.details.map((err) => err.message).join(",");
    return next(new HttpError(errMessage, 400));
  }
  next();
};
export default validate;
