import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMyInfo, useUpdateMe } from "../hooks/auth";

interface EditUserProps {
  onClose: () => void;
}

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please provide a valid email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfile = ({ onClose }: EditUserProps) => {
  const { myInfo } = useGetMyInfo();
  const { updateMe, isPending } = useUpdateMe();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: myInfo?.user.firstName,
      lastName: myInfo?.user.lastName,
      email: myInfo?.user.email,
    },
  });
  useEffect(() => {
    if (myInfo?.user) {
      reset({
        firstName: myInfo.user.firstName,
        lastName: myInfo.user.lastName,
        email: myInfo.user.email,
      });
    }
  }, [myInfo, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      await updateMe(data);
      onClose();
      reset(data);
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Enter your first name"
            />
          )}
        />
        {errors.firstName && (
          <p className="text-sm text-red-500 mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Enter your last name"
            />
          )}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className="w-full px-4 py-2 border rounded text-gray-700"
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditProfile;
