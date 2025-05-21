import api from "./config";
import CustomError from "@/utils/CustomError";

export async function getTypes(category) {
  try {
    const res = await api.get(`/api/v1/types/${category}`);
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}
