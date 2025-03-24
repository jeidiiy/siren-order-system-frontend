<template>
  <v-container class="pt-0">
    <CategorySelector />
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="4"
      >
        <ProductCard :info="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import api from '@/apis/config';
import {useRoute} from "vue-router";

const products = ref(null);
const route = useRoute();
const query = route.query;

async function fetchDefaultData() {
  try {
    const res = await api.get(`/api/v1/products?typeId=${query.typeId}`);
    products.value = res.data;
  } catch (error) {
    throw new Error(error);
  }
}

onMounted(fetchDefaultData);
</script>
