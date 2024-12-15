import toast from "react-hot-toast";

import { AxiosError } from "axios";

export const handleError = (error: AxiosError) => {
  console.log("error", error);
  const message: string =
    error?.response?.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
      ? String(error.response.data.message)
      : "An unexpected error occurred";
  toast.error(message);
  console.log("error message", message);
  return message;
};
