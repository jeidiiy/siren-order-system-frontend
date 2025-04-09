<template>
  <v-app-bar
    elevation="0"
    color="primary"
    scroll-behavior="hide"
    scroll-threshold="68"
  >
    <v-container class="d-flex justify-space-between align-center wrapper">
      <v-hover>
        <template #default="{isHovering, props}">
          <div
            v-bind="props"
            class="text-h5 fit-content"
            :class="isHovering && 'cursor-pointer'"
            @click="() => {
              router.push('/');
              changeCategory('beverage');
            }"
          >
            사이렌 오더
          </div>
        </template>
      </v-hover>
      <v-btn
        v-if="!accessToken"
        append-icon="mdi-login"
        @click="dialog = true"
      >
        <span class="text-h6">
          로그인
        </span>
      </v-btn>
      <v-menu v-else>
        <template #activator="{props}">
          <v-btn v-bind="props">
            {{ username }}
            <v-icon icon="mdi-menu-down" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="callbacks[index]"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <LoginForm @close="dialog = false" />
  </v-dialog>
</template>

<script setup>
import useAuthStore from "@/stores/auth";
import useCategoryStore from "@/stores/category";
import useCartStore from "@/stores/cart";

const dialog = ref(false);

const router = useRouter();

const authStore = useAuthStore();
const {username, accessToken} = storeToRefs(authStore);
const {logout} = authStore;

const categoryStore = useCategoryStore();
const {changeCategory} = categoryStore;

const cartStore = useCartStore();
const {removeAll} = cartStore;

const items = [
  {title: '설정'},
  {title: '주문내역'},
  {title: '로그아웃'}
];
const callbacks = [
  () => {router.push('/setting');},
  () => {router.push('/orders');},
  () => {
    logout();
    removeAll();
    router.push('/');
  }
];
</script>

<style scoped>
.fit-content {
  width: fit-content;
}
</style>
