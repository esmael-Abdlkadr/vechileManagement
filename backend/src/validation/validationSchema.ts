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

export const vehicleValidationSchema = {
  create: joi.object({
    name: joi.string().trim().max(100).required().messages({
      "string.empty": "Vehicle name is required.",
      "string.max": "Vehicle name cannot exceed 100 characters.",
    }),
    status: joi
      .string()
      .valid("Active", "Inactive", "In Maintenance")
      .default("Inactive")
      .required()
      .messages({
        "any.only":
          "Status must be one of ['Active', 'Inactive', 'In Maintenance'].",
        "string.empty": "Status is required.",
      }),
    licensePlate: joi.string().trim().required().messages({
      "string.empty": "License plate is required.",
    }),
    vehicleModel: joi.string().trim().required().messages({
      "string.empty": "Vehicle model is required.",
    }),
    make: joi.string().trim().required().messages({
      "string.empty": "Make is required.",
    }),
    year: joi.number().required().messages({
      "number.base": "Year must be a number.",
      "any.required": "Year is required.",
    }),
    mileage: joi.number().min(0).required().messages({
      "number.base": "Mileage must be a number.",
      "number.min": "Mileage cannot be negative.",
      "any.required": "Mileage is required.",
    }),
    fuelType: joi
      .string()
      .valid("Petrol", "Diesel", "Electric", "Hybrid")
      .required()
      .messages({
        "any.only":
          "Fuel type must be one of ['Petrol', 'Diesel', 'Electric', 'Hybrid'].",
        "string.empty": "Fuel type is required.",
      }),
  }),
};
