import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddVechile } from "../hooks/vechile";
import { useNavigate } from "react-router-dom";

interface AddVechile {
  onClose: () => void;
}
const vehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["Active", "Inactive", "In Maintenance"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  licensePlate: z.string().min(1, "License plate is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  make: z.string().min(1, "Make is required"),
  year: z
    .number()
    .min(1886, "Year must be a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"], {
    errorMap: () => ({ message: "Fuel type is required" }),
  }),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const AddNewVechile = ({ onClose }: AddVechile) => {
  const navigate = useNavigate();
  const { addNewVechile, isPending } = useAddVechile();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: "Active",
      fuelType: "Petrol",
    },
  });

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    try {
      await addNewVechile(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Add Vehicle Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid  grid-cols-1 lg:grid-cols-2   gap-8 mx-8 my-8">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter vehicle name"
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full px-4 py-2 border rounded">
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="In Maintenance">In Maintenance</option>
              </select>
            )}
          />
          {errors.status && (
            <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            License Plate
          </label>
          <Controller
            name="licensePlate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter license plate"
              />
            )}
          />
          {errors.licensePlate && (
            <p className="text-sm text-red-500 mt-1">
              {errors.licensePlate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Vehicle Model
          </label>
          <Controller
            name="vehicleModel"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter vehicle model"
              />
            )}
          />
          {errors.vehicleModel && (
            <p className="text-sm text-red-500 mt-1">
              {errors.vehicleModel.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Make</label>
          <Controller
            name="make"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter make"
              />
            )}
          />
          {errors.make && (
            <p className="text-sm text-red-500 mt-1">{errors.make.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter year"
                onChange={(e) =>
                  field.onChange(e.target.value ? parseInt(e.target.value) : "")
                }
              />
            )}
          />
          {errors.year && (
            <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mileage</label>
          <Controller
            name="mileage"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter mileage"
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseFloat(e.target.value) : ""
                  )
                }
              />
            )}
          />
          {errors.mileage && (
            <p className="text-sm text-red-500 mt-1">
              {errors.mileage.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fuel Type</label>
          <Controller
            name="fuelType"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full px-4 py-2 border rounded">
                <option value="" disabled>
                  Select Fuel Type
                </option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            )}
          />
          {errors.fuelType && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fuelType.message}
            </p>
          )}
        </div>
      </div>
      <div className="m-8 lg:my-[64px] ">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 px-3"
        >
          {isPending ? "Adding..." : "Add Vehicle"}
        </button>
      </div>
    </form>
  );
};

export default AddNewVechile;
