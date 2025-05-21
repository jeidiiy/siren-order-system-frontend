import api from "./config";
import CustomError from "@/utils/CustomError";

export async function getStores() {
  try {
    const res = await api.get('/api/v1/stores');
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function getStoreById(id) {
  try {
    const res = await api.get(`/api/v1/stores/${id}`);
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}
