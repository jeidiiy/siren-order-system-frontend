<template>
  <v-container class="pt-0">
    <v-row>
      <v-col
        v-for="order in orders"
        :key="order.id"
        cols="12"
      >
        <OrderListItem :info="order" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {getOrders} from "@/apis/order";
import useAuthStore from "@/stores/auth";

const orders = ref(null);
const authStore = useAuthStore();
const {username, accessToken} = storeToRefs(authStore);

orders.value = await getOrders(username.value, accessToken.value);
</script>
