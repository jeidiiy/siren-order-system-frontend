import api from "./config";
import CustomError from "@/utils/CustomError";

export async function createOrder({storeId, pickupOption}, cart, accessToken) {
  try {
    await api.post(`/api/v1/orders`, {storeId, pickupOption, orderProducts: cart}, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function getOrders(username, accessToken) {
  try {
    const res = await api.get(`/api/v1/orders/${username}`, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function getOrder(username, orderId, accessToken) {
  try {
    const res = await api.get(`/api/v1/orders/${username}/${orderId}`, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}
