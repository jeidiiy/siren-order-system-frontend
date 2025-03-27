import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TypeView from "@/pages/TypeView.vue";
import IndexView from "@/pages/IndexView.vue";
import ProductView from "@/pages/ProductView.vue";
import StoreView from "@/pages/StoreView.vue";
import OnlyAppHeaderLayout from "@/layouts/OnlyAppHeaderLayout.vue";
import SignupView from "@/pages/SignupView.vue";
import SettingView from "@/pages/SettingView.vue";

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
        path: 'setting',
        component: SettingView,
      },
      }
    ]
  }
];

export default routes;
