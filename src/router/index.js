import {createRouter, createWebHistory} from 'vue-router/auto';
import routes from "./routes";
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  const {accessToken, silentRefresh} = authStore;
  const {showAlert} = alertStore;

  if (accessToken) {
    await silentRefresh();
  }

  if (to.meta.requiresAuth) {
    if (!accessToken) {
      showAlert('로그인 후 이용바랍니다', 'warning')
      return {
        path: '/'
      };
    }
  }
});

export default router;
