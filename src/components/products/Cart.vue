<template>
  <v-card>
    <v-card-title class="text-h5">
      장바구니
    </v-card-title>
    <v-list>
      <v-list-item
        v-for="product in cart"
        :key="product.id"
        variant="text"
      >
        <template #prepend>
          <v-icon
            :disabled="cartLoading"
            @click="removeProduct(username, product.cartId, accessToken)"
          >
            mdi-close-circle
          </v-icon>
        </template>
        <div class="d-flex justify-space-between">
          <v-list-item-title>
            {{ product.productKrName }}
          </v-list-item-title>
          <div class="d-flex">
            <v-icon
              :disabled="cartLoading"
              @click="product.quantity > 1 && upsertProduct(username, accessToken, {cartId: product.cartId, productId: product.productId, quantity: product.quantity - 1})"
            >
              mdi-minus-circle
            </v-icon>
            <div class="quantity">
              {{ product.quantity }}
            </div>
            <v-icon
              :disabled="cartLoading"
              @click="upsertProduct(username, accessToken, {cartId: product.cartId, productId: product.productId, quantity: product.quantity + 1})"
            >
              mdi-plus-circle
            </v-icon>
            <div class="price">
              &#8361; {{ (product.price * product.quantity).toLocaleString() }}
            </div>
          </div>
        </div>
      </v-list-item>
    </v-list>
    <v-card-text class="text-right">
      <v-btn
        :loading="cartLoading"
        :disabled="cartLoading"
        color="warning"
        prepend-icon="mdi-close-circle"
        rounded
        @click="clearCart(username, accessToken)"
      >
        모두 지우기
      </v-btn>
      <div
        v-if="store"
        class="text-h6 mt-5"
      >
        {{ `주문할 매장: ${store.storeName}` }}
      </div>
      <div class="text-h5 mt-5">
        총 금액: &#8361; {{ totalPrice.toLocaleString() }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="loading || cart.length === 0 || !store"
        :loading
        color="primary"
        block
        variant="flat"
        @click="handleOrder"
      >
        {{ store ? '주문하기' : '먼저 주문할 매장을 선택해주세요' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/auth";
import useCartStore from "@/stores/cart";
import useStoreStore from "@/stores/store";
import {createOrder} from "@/apis/order";
import {onMounted} from "vue";

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}

const cartStore = useCartStore();
const {cart, loading: cartLoading, totalPrice} = storeToRefs(cartStore);
const {getCart, upsertProduct, removeProduct, clearCart} = cartStore;

const storeStore = useStoreStore();
const {store} = storeToRefs(storeStore);

const authStore = useAuthStore();
const {username, accessToken} = storeToRefs(authStore);

const alertStore = useAlertStore();
const {showAlert} = alertStore;

const loading = ref(false);

onMounted(async () => {
  await getCart(username.value, accessToken.value);
});

async function handleOrder() {
  try {
    loading.value = true;
    // 상품 id 와 주문 수량만 요청에 담기 위해 매핑 처리
    await createOrder(store.value, (cart.value.map(({price, productKrName, cartId, ...rest}) => ({id: rest.productId, quantity: rest.quantity}))), accessToken.value);
    await clearCart(username.value, accessToken.value);
    closeModal();
    showAlert('주문에 성공하였습니다!', 'success');
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.quantity {
  text-align: center;
  width: 24px;
  /* 99까지 커버 */
  font-variant-numeric: tabular-nums;
}

.price {
  width: 80px;
  /* 999,999까지 커버 */
  text-align: right;
  font-variant-numeric: tabular-nums;
  /* 숫자 폭 균등 */
}
</style>
