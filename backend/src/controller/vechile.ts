import exp from "constants";
import { Vehicle } from "../model/vichle";
import asyncHandler from "../utils/asyncHandler";
import HttpError from "../utils/httpError";
import { getPagination } from "../utils/pagination";
import { getSortQuery } from "../utils/sort";
import { vehicleValidationSchema } from "../validation/validationSchema";

export const addVechile = asyncHandler(async (req, res, next) => {
  const validationResult = vehicleValidationSchema.create.validate(req.body);
  if (validationResult.error) {
    return next(new HttpError(validationResult.error.details[0].message, 400));
  }
  const {
    name,
    status,
    licensePlate,
    model,
    make,
    year,
    mileage,
    fuelType,
    vehicleModel,
  } = validationResult.value;
  const vehicleExist = await Vehicle.findOne({
    name: { $regex: new RegExp(name.replace(/\s+/g, "\\s*"), "i") },
  });
  if (vehicleExist) {
    return next(new HttpError("Vehicle already exists", 400));
  }
  const vehicle = await Vehicle.create({
    name,
    status,
    licensePlate,
    model,
    make,
    year,
    mileage,
    fuelType,
    vehicleModel,
  });
  res.status(201).json({
    status: "success",
    vehicle,
  });
});
export const getAllVechile = asyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    status,
    sortField = "createdAt",
    sortDirection = "asc",
  } = req.query;

  console.log("req.query", req.query);
  const skip = getPagination(Number(page), Number(limit)).skip;
  let query = {};
  if (status) {
    query = { status };
  }
  //   sort query.
  let sortQuery = {};
  try {
    sortQuery = getSortQuery(sortField as string, sortDirection as string);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: (err as Error).message,
    });
  }
  const vehicles = await Vehicle.find({ ...query, isDeleted: false })
    .sort(sortQuery)
    .skip(skip)
    .limit(Number(limit));
  const total = await Vehicle.countDocuments(query);
  res.status(200).json({
    status: "success",
    vehicles,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});
export const getVechile = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    return next(new HttpError("Vehicle not found", 404));
  }
  res.status(200).json({
    status: "success",
    vehicle,
  });
});
export const updateVechile = asyncHandler(async (req, res, next) => {
  const {
    status,
    licensePlate,
    model,
    make,
    year,
    mileage,
    fuelType,
    vehicleModel,
  } = req.body;
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle || vehicle.isDeleted) {
    return next(new HttpError("Vehicle not found", 404));
  }
  if (status) vehicle.status = status;
  if (licensePlate) vehicle.licensePlate = licensePlate;
  if (model) vehicle.model = model;
  if (make) vehicle.make = make;
  if (year) vehicle.year = year;
  if (mileage) vehicle.mileage = mileage;
  if (vehicleModel) vehicle.vehicleModel = vehicleModel;
  if (fuelType) vehicle.fuelType = fuelType;
  vehicle.lastUpdated = new Date();
  await vehicle.save();
  res.status(200).json({
    status: "success",
    vehicle,
  });
});
export const deleteVechile = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle || vehicle.isDeleted) {
    return next(new HttpError("Vehicle not found", 404));
  }
  vehicle.isDeleted = true;
  await vehicle.save();
  res.status(204).json({
    status: "success",
  });
});
