<template>
  <v-container class="pt-0">
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="4"
      >
        <ProductListItem :info="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import api from '@/apis/config';

const products = ref(null);
const route = useRoute();
const query = route.query;

const res = await api.get(`/api/v1/products?typeId=${query.typeId}`);
products.value = res.data;
</script>
