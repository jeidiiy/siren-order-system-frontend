import api from "./config";

export async function getTypes(category) {
  try {
    const res = await api.get(`/api/v1/types/${category}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
