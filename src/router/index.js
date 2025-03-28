import {createRouter, createWebHistory} from 'vue-router/auto';
import routes from "./routes";
import useAuthStore from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (!authStore.accessToken) {
      window.alert('로그인 후 이용바랍니다.')
      return {
        path: '/'
      };
    }
  }
});

export default router;
