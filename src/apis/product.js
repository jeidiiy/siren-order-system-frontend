import api from "./config";

export async function getProducts(typeId) {
  try {
    const res = await api.get(`/api/v1/products?typeId=${typeId}`)
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
