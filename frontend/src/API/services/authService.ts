import apiCall from "../../utils/apiHelper";
import { API_ENDPOINTS } from "../apiEndpoints";
import showToast from "../../utils/toastHelper";
interface AuthData extends Record<string, unknown> {
  email: string;
  password: string;
}
interface ChangePasswordData extends Record<string, unknown> {
  currentPassword: string;
  newPassword: string;
}
interface AuthResponse {
  token: string;
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

interface SignUpData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface UpdateUserdata extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
}
export const signup = async (data: SignUpData) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.SIGNUP, data);
    showToast("User account crerated  sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("signup error", err);
    throw err;
  }
};

export const login = async (data: AuthData) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    showToast("Login sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("Login error", err);
    throw err;
  }
};
export const myInfo = async () => {
  try {
    const response = await apiCall<AuthResponse>(
      API_ENDPOINTS.MY_INFO,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("My info error", err);
    throw err;
  }
};
export const updateMe = async (data: UpdateUserdata) => {
  try {
    const response = await apiCall<AuthResponse>(
      API_ENDPOINTS.UPDATE_ME,
      data,
      "PATCH"
    );
    showToast("User account updated sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("updateMe error", err);
    throw err;
  }
};
export const changePassword = async (data: ChangePasswordData) => {
  try {
    const response = await apiCall<SucessResponse>(
      API_ENDPOINTS.CHANGE_PASSWORD,
      data
    );
    showToast("Password changed sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("changePassword error", err);
    throw err;
  }
};
