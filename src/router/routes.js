import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TypeView from "@/pages/TypeView.vue";
import IndexView from "@/pages/IndexView.vue";
import ProductView from "@/pages/ProductView.vue";
import StoreView from "@/pages/StoreView.vue";
import OnlyAppHeaderLayout from "@/layouts/OnlyAppHeaderLayout.vue";
import SignupView from "@/pages/SignupView.vue";
import SettingView from "@/pages/SettingView.vue";
import ChangePasswordView from "@/pages/ChangePasswordView.vue";
import OrderListView from "@/pages/OrderListView.vue";

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: IndexView,
      },
      {
        path: 'types',
        component: TypeView,
      },
      {
        path: 'products',
        component: ProductView,
      }
    ]
  },
  {
    path: '/',
    component: OnlyAppHeaderLayout,
    children: [
      {
        path: 'stores',
        component: StoreView
      },
      {
        path: 'signup',
        component: SignupView
      },
      {
        path: 'orders',
        component: OrderListView,
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'setting',
        component: SettingView,
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'setting/password',
        component: ChangePasswordView,
        meta: {
          requiresAuth: true,
        }
      }
    ]
  }
];

export default routes;
