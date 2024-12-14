import joi from "joi";
export const signupSchema = joi.object({
  firstName: joi.string().trim().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: joi.string().trim().required().messages({
    "string.empty": "Last name is required",
  }),
  email: joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),

  role: joi.string().valid("user", "admin").default("user"),
});
export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
