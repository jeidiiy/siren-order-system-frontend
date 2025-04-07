<template>
  <v-app-bar
    elevation="0"
    color="primary"
    location="bottom"
  >
    <v-container class="wrapper d-flex justify-space-between align-center">
      <div class="button-wrapper">
        <v-btn
          class="text-h6"
          width="100%"
          @click="$router.push('/stores')"
        >
          <div v-if="!store">
            여기를 클릭해서 주문할 매장을 선택해주세요
          </div>
          <div v-else>
            <span>
              {{ store.storeName }}
            </span>
            <span class="opacity-70">
              ({{ store.pickupOption }})
            </span>
          </div>
        </v-btn>
      </div>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="600px"
        transition="dialog-transition"
      >
        <template #activator="{props: activatorProps}">
          <v-btn v-bind="activatorProps">
            <v-badge
              v-if="totalQuantity > 0"
              :content="totalQuantity"
            >
              <v-icon>
                mdi-basket-plus-outline
              </v-icon>
            </v-badge>
            <v-icon v-else>
              mdi-basket-plus-outline
            </v-icon>
          </v-btn>
        </template>
        <template #default>
          <Cart @close="dialog = false" />
        </template>
      </v-dialog>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import useCartStore from "@/stores/cart";
import useStoreStore from "@/stores/store";

const cartStore = useCartStore();
const {totalQuantity} = storeToRefs(cartStore);

const storeStore = useStoreStore();
const {store} = storeToRefs(storeStore);

const dialog = ref(false);
</script>

<style lang="scss" scoped>
.button-wrapper {
  width: 100%;
}
</style>
