import api from "./config";
import CustomError from "@/utils/CustomError";

export async function getProducts(typeId) {
  try {
    const res = await api.get(`/api/v1/products?typeId=${typeId}`)
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}
