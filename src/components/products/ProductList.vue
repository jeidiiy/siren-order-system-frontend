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
import {getProducts} from "@/apis/product";

const products = ref(null);
const route = useRoute();
const query = route.query;

products.value = await getProducts(query.typeId);
</script>
