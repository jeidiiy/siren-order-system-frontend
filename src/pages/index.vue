<template>
  <v-container class="pt-0">
    <CategorySelector />
    <v-row>
      <v-col
        v-for="type in types"
        :key="type.id"
        cols="4"
      >
        <TypeCard :info="type" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import api from '@/apis/config';

const types = ref(null);

async function fetchDefaultData() {
  try {
    const res = await api.get(`/api/v1/types/beverage`);
    types.value = res.data;
  } catch (error) {
    // TODO: 에러 처리 필요
    throw new Error(error);
  }
}

onMounted(fetchDefaultData);
</script>
