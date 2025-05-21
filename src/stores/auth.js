import api from "@/apis/config";
import {decodeJWT} from "@/utils/jwt";
import {defineStore} from 'pinia';
import CustomError from "@/utils/CustomError";

export const BEARER_PREFIX = "Bearer ";

const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const accessToken = ref('');

  const isAuthenticated = computed(() => accessToken.value ? true : false);

  async function login(inputUsername, password) {
    try {
      const res = await api.post("/api/v1/users/authenticate", {username: inputUsername, password});
      accessToken.value = res.headers['authorization'].substring(BEARER_PREFIX.length);
      username.value = inputUsername;
    } catch (error) {
      throw new CustomError(error.message, error.response.data);
    }
  }

  async function logout() {
    try {
      await api.post("/api/v1/logout", {}, {
        headers: {"Authorization": BEARER_PREFIX + accessToken.value}
      });
      accessToken.value = null;
      username.value = null;
      localStorage.removeItem('auth');
    } catch (error) {
      throw new CustomError(error.message, error.response.data);
    }
  }

  async function silentRefresh() {
    try {
      const res = await api.post('/api/v1/refresh-token', null, {
        headers: {
          "Authorization": BEARER_PREFIX + accessToken.value
        }
      });
      accessToken.value = res.headers['authorization'].substring(BEARER_PREFIX.length);
      username.value = decodeJWT(accessToken.value).payload.sub;
    } catch (error) {
      throw new CustomError(error.message, error.response.data);
    }
  }

  return {username, accessToken, isAuthenticated, login, logout, silentRefresh};
}, {
  persist: true
});

export default useAuthStore;
