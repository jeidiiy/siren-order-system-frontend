import api from "@/apis/config";
import {decodeJWT} from "@/utils/jwt";
import {defineStore} from 'pinia';

export const BEARER_PREFIX = "Bearer ";

const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null,
    accessToken: null,
  }),

  persist: true,

  actions: {
    async login(username, password) {
      try {
        const res = await api.post("/api/v1/users/authenticate", {username, password});
        this.accessToken = res.headers['authorization'].substring(BEARER_PREFIX.length);
        this.username = username;
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        console.error(error);

        return false;
      }
    },

    async logout() {
      try {
        await api.post("/api/v1/logout");
        this.accessToken = null;
        this.username = null;
        api.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('auth')
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        console.error(error);

        return false;
      }
    },

    async silentRefresh() {
      try {
        const res = await api.post('/api/v1/refresh-token');
        this.accessToken = res.headers['authorization'].substring(BEARER_PREFIX.length);
        this.username = decodeJWT(this.accessToken).payload.sub;
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        console.error(error);

        return false;
      }
    }
  }
});

export default useAuthStore;
