import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TypeView from "@/pages/TypeView.vue";
import IndexView from "@/pages/IndexView.vue";
import ProductView from "@/pages/ProductView.vue";
import StoreView from "@/pages/StoreView.vue";
import StoreLayout from "@/layouts/StoreLayout.vue";

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
      },
    ]
  },
  {
    path: '/stores',
    component: StoreLayout,
    children: [
      {
        path: '',
        component: StoreView
      }
    ]
  }
];

export default routes;
