<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle
          v-model="category"
          color="success"
          mandatory
        >
          <v-btn
            value="beverage"
            @click="() => {
              changeCategory('beverage');
              $router.push('/types?category=beverage');
            }"
          >
            음료
          </v-btn>
          <v-btn
            value="food"
            @click="() => {
              changeCategory('food');
              $router.push('/types?category=food');
            }"
          >
            푸드
          </v-btn>
          <v-btn
            value="merchandise"
            @click="() => {
              changeCategory('merchandise');
              $router.push('/types?category=merchandise');
            }"
          >
            상품
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import useCategoryStore from "@/stores/category";

const categoryStore = useCategoryStore();
const {category} = storeToRefs(categoryStore);
const {changeCategory} = categoryStore;
</script>
