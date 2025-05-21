import {createRouter, createWebHistory} from "vue-router/auto";
import routes from "./routes";
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/auth";
import ErrorCodes from "@/utils/ErrorCodes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  const {accessToken, silentRefresh, logout} = authStore;
  const {showAlert} = alertStore;

  if (accessToken) {
    try {
      await silentRefresh();
    } catch (error) {
      const code = error.data.code;
      switch (code) {
        case ErrorCodes.REFRESH_TOKEN.ACCESS_TOKEN_VALID: // 액세스 토큰 유효 - 패스
          break;
        // 로그인 후 1달 이상 방치한 경우 리프레시 토큰이 만료됐지만 브라우저에는 로그인 정보가 남아있을 수 있으므로 로그아웃 처리
        case ErrorCodes.REFRESH_TOKEN.TOKEN_EXPIRED:
          await logout();
          showAlert("로그인 후 이용바랍니다", "warning");
          break;
        // 쿠키에 리프레시 토큰 없이 요청을 보내거나 DB에 토큰이 없는 경우 로그인한 적 없음 -> 로그인 유도
        case ErrorCodes.REFRESH_TOKEN.TOKEN_NOT_FOUND:
        case ErrorCodes.REFRESH_TOKEN.COOKIE_TOKEN_NOT_FOUND:
          showAlert("로그인 후 이용바랍니다", "warning");
          break;
        default:
          throw new Error(code);
      }
    }
  }

  if (to.meta.requiresAuth) {
    if (!accessToken) {
      showAlert("로그인 후 이용바랍니다", "warning");
      return {
        path: "/",
      };
    }
  }
});

export default router;
