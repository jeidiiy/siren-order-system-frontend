<template>
  <v-container>
    <v-row>
      <v-col v-for="store in filteredStores" :key="store.storeId" cols="6">
        <StoreListItem :store="store" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import api from "@/apis/config";

const stores = ref([]);

const res = await api.get('/api/v1/stores');
stores.value = res.data;

const filteredStores = computed(() =>
  stores.value.map(store => ({
    ...store,
    pickupOptions: store.pickupOptions.filter(option =>
      ["차량 픽업", "딜리버스"].includes(option.name)
    ),
  }))
);
</script>
