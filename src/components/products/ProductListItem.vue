<template>
  <v-hover v-slot="{isHovering, props}">
    <v-card
      v-bind="props"
      max-width="270"
      height="270"
      class="mx-auto"
      :loading="loading"
    >
      <v-img
        color="surface-variant"
        height="150"
        src="https://cdn.pixabay.com/photo/2023/11/14/17/58/coffee-8388244_640.jpg"
        cover
      />
      <v-card-title>
        {{ krName }}
      </v-card-title>
      <v-card-subtitle class="text-no-wrap">
        {{ enName }}
      </v-card-subtitle>
      <v-card-text>
        &#8361;{{ basePrice.toLocaleString() }}
      </v-card-text>
      <div
        v-if="isHovering"
        class="d-flex justify-center align-center text-h4"
        :class="loading && 'disabled-click'"
        style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); color: white; cursor: pointer;"
        @click="async () => {
          if (accessToken) {
            const product = cart.find((product) => product.productId === id);
            if (product) {
              await upsertProduct(username, accessToken, {cartId: product.cartId, productId: id, quantity: product.quantity + 1});
            } else {
              await upsertProduct(username, accessToken, {cartId: null, productId: id, quantity: null});
            }
            showAlert('장바구니에 해당 상품을 추가하였습니다!', 'info');
          } else {
            showAlert('로그인 후 이용해주세요!', 'warning');
          }
        }"
      >
        담기
      </div>
    </v-card>
  </v-hover>
</template>

<script setup>
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/auth";
import useCartStore from "@/stores/cart";

const cartStore = useCartStore();
const {cart, loading} = storeToRefs(cartStore);
const {upsertProduct} = cartStore;
const productProps = defineProps({
  info: {
    type: {
      id: Number,
      krName: String,
      enName: String,
      basePrice: Number,
      imageUrl: String
    },
    required: true,
    default: () => ({id: 0, krName: '제목', enName: 'title', basePrice: '3000', imageUrl: ''})
  }
});

const {id, krName, enName, basePrice} = productProps.info;

const alertStore = useAlertStore();
const {showAlert} = alertStore;

const authStore = useAuthStore();
const {username, accessToken} = storeToRefs(authStore);

</script>
<style scoped>
.disabled-click {
  pointer-events: none;
}
</style>
