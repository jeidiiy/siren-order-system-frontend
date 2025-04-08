<template>
  <LoadingSpinner v-if="loading" />
  <v-card
    v-else
    max-width="600"
    width="100%"
    class="mx-auto"
  >
    <v-card-item class="pb-0">
      <div class="d-flex flex-row justify-space-between">
        <div class="font-weight-bold">
          {{ status }}
        </div>
        <v-icon
          class="cursor-pointer"
          @click="closeModal"
        >
          mdi-close-circle
        </v-icon>
      </div>
      <v-card-title>{{ order.storeName }}</v-card-title>
      <v-card-subtitle>
        {{ order.orderProductResponseDtos.length > 1 ?
          `${order.orderProductResponseDtos[0].productResponseDto.krName} 외 ${order.orderProductResponseDtos.length - 1}개` :
          `${order.orderProductResponseDtos[0].productResponseDto.krName}` }}
        <v-spacer />
        주문일시: {{ formatDateTime(order.orderedDateTime) }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(orderProduct) in order.orderProductResponseDtos"
          :key="orderProduct.id"
        >
          <div class="font-weight-medium">
            {{ orderProduct.productResponseDto.krName }} {{ orderProduct.quantity }}개
          </div>
          <div>
            {{ (orderProduct.productResponseDto.basePrice * orderProduct.quantity).toLocaleString() }}원
          </div>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-between text-h6">
        <div>총 금액</div>
        <div>{{ order.totalPrice.toLocaleString() }}원</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {getOrder} from "@/apis/order";
import useAuthStore from "@/stores/auth";
import {formatDateTime} from "@/utils/time";

const orderProps = defineProps({
  id: {
    type: Number,
    default: -1
  }
});

const emits = defineEmits(['close']);
function closeModal() {
  emits('close');
}

const authStore = useAuthStore();
const orderId = orderProps.id;

const {username, accessToken} = storeToRefs(authStore);

const order = ref(null);
const loading = ref(true);
const status = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    order.value = await getOrder(username.value, orderId, accessToken.value);
    status.value = (() => {
  switch (order.value.orderStatus) {
    case "PENDING":
      return "접수 대기 중";
    case "MAKING":
      return "조리 중";
    case "COMPLETED":
      return "조리 완료";
    default:
      throw new Error("문제 발생");
  }
})();
  } catch (error) {
    throw new Error(error);
  } finally {
    loading.value = false
  }
});
</script>
