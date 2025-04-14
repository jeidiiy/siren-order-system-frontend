import api from "./config";

export async function get(username, accessToken) {
  try {
    const res = await api.get(`/api/v1/carts/${username}`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function upsert(username, accessToken, req) {
  try {
    const res = await api.post(`/api/v1/carts/${username}`, req, {
      headers: {
        "Authorization": "Bearer " + accessToken
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function remove(username, cartId, accessToken) {
  try {
    const res = await api.delete(`/api/v1/carts/${username}/${cartId}`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeAll(username, accessToken) {
  try {
    const res = await api.delete(`/api/v1/carts/${username}`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
