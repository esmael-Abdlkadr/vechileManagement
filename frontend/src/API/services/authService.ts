import apiCall from "../../utils/apiHelper";
import { API_ENDPOINTS } from "../apiEndpoints";
import showToast from "../../utils/toastHelper";
interface AuthData {
  email: string;
  password: string;
}
interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
interface SucessResponse {
  status: string;
  message: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const signup = async (data: SignUpData) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.SIGNUP, data);
    showToast("User account crerated  sucessfully", "success");
    return response;
  } catch (err: any) {
    console.error("signup error", err);
    throw err;
  }
};

const login = async (data: AuthData) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    showToast("Login sucessfully", "success");

    return response;
  } catch (err: any) {
    console.error("Login error", err);
    throw err;
  }
};
const logout = async () => {
  try {
    const response = await apiCall<SucessResponse>(API_ENDPOINTS.LOGOUT);
    showToast("Logout sucessfully", "success");
    return response;
  } catch (err: any) {
    console.error("Logout error", err);
    throw err;
  }
};

export { login, logout, signup };
