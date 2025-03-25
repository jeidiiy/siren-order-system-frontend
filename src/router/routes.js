import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoryView from "@/pages/CategoryView.vue";
import IndexView from "@/pages/IndexView.vue";
import ProductView from "@/pages/ProductView.vue";
import StoreView from "@/pages/StoreView.vue";

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: IndexView,
      },
      {
        path: '/stores',
        component: StoreView,
      },
      {
        path: '/categories',
        component: CategoryView,
      },
      {
        path: '/products',
        component: ProductView,
      },
    ]
  }
];

export default routes;
