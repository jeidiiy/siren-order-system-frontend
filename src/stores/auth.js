import api from "@/apis/config";
import {decodeJWT} from "@/utils/jwt";
import {defineStore} from 'pinia';

export const BEARER_PREFIX = "Bearer ";

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {username: null, nickname: null, realname: null},
    accessToken: null,
  }),

  actions: {
    async login(username, password) {
      try {
        const res = await api.post("/api/v1/users/authenticate", {username, password});
        this.accessToken = res.headers['authorization'].substring(BEARER_PREFIX.length);
        this.user.username = username;
        api.defaults.headers.common['Authorization'] = `${BEARER_PREFIX + this.accessToken}`;
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        return false;
      }
    },

    async logout() {
      try {
        await api.post("/api/v1/logout");
        this.accessToken = null;
        this.user.username = null;
        api.defaults.headers.common['Authorization'] = null;
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        return false;
      }
    },

    async silentRefresh() {
      try {
        const res = await api.post('/api/v1/refresh-token');
        this.accessToken = res.headers['authorization'].substring(BEARER_PREFIX.length);
        this.user.username = decodeJWT(this.accessToken).payload.sub;
        api.defaults.headers.common['Authorization'] = `${BEARER_PREFIX + this.accessToken}`;
        return true;
      } catch (error) {
        // TODO: 에러 처리 필요
        return false;
      }
    }
  }
});

export default useAuthStore;
