import { Schema, model, Document } from "mongoose";
interface IVehicle extends Document {
  name: string;
  status: string;
  licensePlate: string;
  vehicleModel: string;
  make: string;
  year: number;
  mileage: number;
  fuelType: string;
  lastUpdated: Date;
  isDeleted: boolean;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "In Maintenance"],
      default: "Active",
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Indexes
vehicleSchema.index({ name: 1 });
vehicleSchema.index({ status: 1, isDeleted: 1 });
vehicleSchema.index({ lastUpdated: 1 });

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
