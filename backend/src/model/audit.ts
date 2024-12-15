import { Schema, model, Document } from "mongoose";
interface IAudit extends Document {
  vehicleId: string;
  previousStatus: string;
  newStatus: string;
  updatedAt: Date;
}

const auditSchema = new Schema<IAudit>(
  {
    vehicleId: {
      type: Schema.Types.String,
      ref: "Vehicle",
      required: true,
    },
    previousStatus: {
      type: String,
      required: true,
    },
    newStatus: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
auditSchema.index({ vehicleId: 1 });

export const Audit = model<IAudit>("Audit", auditSchema);
