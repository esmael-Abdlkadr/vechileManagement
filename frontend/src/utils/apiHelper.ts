import instance from "../API/axiosConfig";
import { handleError } from "./errorHandler";
import { AxiosError } from "axios";
const apiCall = async <T>(
  url: string,
  data: Record<string, unknown> = {},
  method: "POST" | "GET" | "PATCH" | "DELETE" = "POST"
): Promise<T> => {
  try {
    const response = await instance({
      url,
      method,
      data,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err: unknown) {
    handleError(err as AxiosError);
    throw err;
  }
};

export default apiCall;
