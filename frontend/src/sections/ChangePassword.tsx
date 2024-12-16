import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useChnangePassword } from "../hooks/auth";
import Spinner from "../components/Spinner";

interface UpdatePassowrdProps {
  onClose: () => void;
}
interface IFormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Define schema for updating password
const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function UpdatePassword({ onClose }: UpdatePassowrdProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { changePassword, isPending } = useChnangePassword();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  // Form Submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Update Password Error:", error);
    }
  };

  if (isPending) {
    return <Spinner />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Current Password */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1">
          Current Password
        </label>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Enter your current password"
            />
          )}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
        <button
          type="button"
          className="absolute inset-y-0 top-4 right-4 flex items-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1">New Password</label>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Enter your new password"
            />
          )}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.newPassword.message}
          </p>
        )}
        <button
          type="button"
          className="absolute inset-y-0 top-4 right-4 flex items-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Confirm your new password"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="button"
          className="absolute inset-y-0 top-4 right-4 flex items-center text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default UpdatePassword;
