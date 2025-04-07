import api from "./config";

export async function createOrder({storeId, pickupOption}, cart, accessToken) {
  try {
    await api.post(`/api/v1/orders`, {storeId, pickupOption, orderProducts: cart}, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
