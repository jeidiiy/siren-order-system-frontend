<template>
  <v-dialog
    v-model="dialog"
  >
    <template #activator="{props: activatorProps}">
      <v-card
        variant="tonal"
      >
        <v-card-title class="d-flex justify-space-between">
          <span>{{ formatToMonthDayWeekday(orderedDateTime) }} &middot; {{ status }}</span>
          <v-btn
            v-bind="activatorProps"
            rounded
            elevation="0"
            border="primary md"
            variant="tonal"
            @click="dialog = true"
          >
            주문상세
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="d-flex">
            <img
              :src="storeImageUrl"
              height="100"
            >
            <div class="d-flex flex-column justify-space-evenly ml-4">
              <div class="text-h4">
                {{ storeName }}
              </div>
              <div class="text-h6">
                {{ orderProductResponseDtos.length > 1 ?
                  `${orderProductResponseDtos[0].productResponseDto.krName} 외 ${orderProductResponseDtos.length - 1}개` :
                  `${orderProductResponseDtos[0].productResponseDto.krName}` }}
                {{ `${totalPrice.toLocaleString()}원` }}
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </template>
    <template #default>
      <OrderDetailModal
        :id="orderId"
        @close="dialog = false"
      />
    </template>
  </v-dialog>
</template>

<script setup>
import {formatToMonthDayWeekday} from "@/utils/time";
import OrderDetailModal from "./OrderDetailModal.vue";

const orderProps = defineProps({
  info: {
    type: {
      orderId: Number,
      storeName: String,
      storeImageUrl: String,
      orderedDateTime: Date,
      orderStatus: String,
      orderProductResponseDtos: [
        {
          productResponseDto: {
            id: Number,
            krName: String,
            enName: String,
            basePrice: Number,
            imageUrl: String
          }
        }
      ],
      totalPrice: Number,
    },
    required: true,
    default: () => ({
      orderId: 0,
      storeName: "store",
      storeImageUrl: "storeImageUrl",
      orderedDateTime: "2020-02-02T02:02:02.02",
      orderStatus: "COMPLETED",
      orderProductResponseDtos: [],
      totalPrice: 0,
    })
  },
});

const {orderId, storeName, storeImageUrl, orderedDateTime, orderStatus, orderProductResponseDtos, totalPrice} = orderProps.info;

const status = (() => {
  switch (orderStatus) {
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

const dialog = ref(false);
</script>

<style lang="scss" scoped></style>
