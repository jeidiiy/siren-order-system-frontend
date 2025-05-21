import api from "./config";
import CustomError from "@/utils/CustomError";

export async function signup(username, password, realname, nickname) {
  try {
    await api.post('/api/v1/users', {username, password, realname, nickname});
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function getMyInfo(username, accessToken) {
  try {
    const res = await api.get(`/api/v1/users/${username}`, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    return res.data;
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function changeRealnameAndNickname(username, realname, nickname, accessToken) {
  try {
    await api.patch(`/api/v1/users/${username}`, {realname, nickname},
      {
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      }
    );
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}

export async function changePassword(username, oldPassword, newPassword, accessToken) {
  try {
    await api.patch(`/api/v1/users/${username}/password`, {oldPassword, newPassword},
      {
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      }
    );
  } catch (error) {
    throw new CustomError(error.message, error.response.data);
  }
}
