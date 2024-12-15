import apiCall from "../../utils/apiHelper";
import { API_ENDPOINTS } from "../apiEndpoints";
import showToast from "../../utils/toastHelper";
interface VechileData {
  name: string;
  status: string;
  licensePlate: string;
  vehicleModel: string;
  make: string;
  year: number;
  mileage: number;
  fuelType: string;
}
export const addVechile = async (data: VechileData) => {
  try {
    const response = await apiCall(API_ENDPOINTS.ADD_VEHICLE, data);
    showToast("Vechile added sucessfully", "success");
    return response;
  } catch (err: any) {
    console.error("Add Vechile error", err);
    throw err;
  }
};
export const getVechiles = async (filters: {
  page: number;
  limit: number;
  // sortField: "createdAt";
  // sortDirection: "asc" | "desc";
}) => {
  try {
    const queryParam = new URLSearchParams(filters as any).toString();
    const response = await apiCall(
      `${API_ENDPOINTS.GET_VEHICLES}?${queryParam}`,
      {},
      "GET"
    );
    console.log("response", response);
    return response;
  } catch (err: any) {
    console.error("Get Vechiles error", err);
    throw err;
  }
};
export const getVechile = async (id: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.GET_VEHICLE}/${id}`,
      {},
      "GET"
    );
    return response;
  } catch (err: any) {
    console.error("Get Vechile error", err);
    throw err;
  }
};
export const updateVechile = async (id: string, data: VechileData) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.UPDATE_VEHICLE}/${id}`,
      data,
      "PATCH"
    );
    showToast("Vechile updated sucessfully", "success");
    return response;
  } catch (err: any) {
    console.error("Update Vechile error", err);
    throw err;
  }
};
export const deleteVechile = async (id: string) => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.DELETE_VEHICLE}/${id}`);
    showToast("Vechile deleted sucessfully", "success");
    return response;
  } catch (err: any) {
    console.error("Delete Vechile error", err);
    throw err;
  }
};
