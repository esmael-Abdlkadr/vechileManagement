import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useSignup } from "../hooks/auth";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

// Define schemas for login and signup
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Determine mode from query params
  const initialIsSignIn = searchParams.get("mode") === "signin";
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);

  // Determine schema dynamically based on mode
  const currentSchema = isSignIn ? loginSchema : signupSchema;

  const { login } = useLogin();
  const { signup } = useSignup();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(currentSchema),
  });

  // Sync `isSignIn` with query parameters
  useEffect(() => {
    setIsSignIn(searchParams.get("mode") === "signin");
  }, [searchParams]);

  // Form Submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (isSignIn) {
        await login(data);
      } else {
        await signup(data);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    const newMode = isSignIn ? "signup" : "signin";
    navigate(`/auth?mode=${newMode}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name & Last Name - Only for Signup */}
          {!isSignIn && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded"
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Enter your last name"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your password"
                />
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
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

          {/* Forgot Password - Only for Sign In */}
          {isSignIn && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="text-center text-sm mt-4">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-blue-600 hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
