import api from "./config";

export async function signup(username, password, realname, nickname) {
  try {
    await api.post('/api/v1/users', {username, password, realname, nickname});
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
  }
}
