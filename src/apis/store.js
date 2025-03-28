import api from "./config";

export async function getStores() {
  try {
    const res = await api.get('/api/v1/stores');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
