import api from "@/apis/config";
import {decodeJWT} from "@/utils/jwt";
import {defineStore} from 'pinia';

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
      return true;
    } catch {
      return false;
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
      return true;
    } catch (error) {
      // TODO: 에러 처리 필요
      console.error(error);

      return false;
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
      return true;
    } catch (error) {
      // TODO: 에러 처리 필요
      console.error(error);

      return false;
    }
  }

  return {username, accessToken, isAuthenticated, login, logout, silentRefresh};
}, {
  persist: true
});

export default useAuthStore;
