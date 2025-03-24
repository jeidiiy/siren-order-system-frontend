<template>
  <v-container class="pt-0">
    <CategorySelector />
    <v-row>
      <v-col
        v-for="type in types"
        :key="type.description"
        cols="4"
      >
        <TypeCard :info="type" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import api from "@/apis/config";
import TypeCard from "@/components/TypeCard.vue";

const route = useRoute();
const category = getCategory(route);
const types = ref(null);

function getCategory(route) {
  return route.query.category;
}

async function fetchTypes(category) {
  try {
    const res = await api.get(`/api/v1/types/${category}`);
    types.value = res.data;
  } catch (error) {
    throw new Error(error);
  }
}

onMounted(() => fetchTypes(category));
// 현재 카테고리를 다시 클릭한 경우엔 데이터를 가져오지 않도록 처리
onBeforeRouteUpdate((to, from) => {
  if (getCategory(to) !== getCategory(from)) {
    fetchTypes(getCategory(to));
  }
});
</script>
