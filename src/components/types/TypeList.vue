<template>
  <v-container class="pt-0">
    <v-row>
      <v-col
        v-for="type in types"
        :key="type.id"
        cols="4"
      >
        <TypeListItem :info="type" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import useCategoryStore from "@/stores/category";
import {getTypes} from "@/apis/type";

const route = useRoute();
const types = ref([]);
const categoryStore = useCategoryStore();
const {category} = storeToRefs(categoryStore);

async function fetchTypes(category) {
  try {
    types.value = await getTypes(category);
  } catch (error) {
    throw new Error(error);
  }
}

onMounted(async () => {
  categoryStore.changeCategory(route.query.category || 'beverage');

  await nextTick(() => {
    fetchTypes(category.value);
  })
})

function getCategory(route) {
  return route.query.category;
}

// 현재 카테고리를 다시 클릭한 경우엔 데이터를 가져오지 않도록 처리
onBeforeRouteUpdate((to, from) => {
  if (getCategory(to) !== getCategory(from)) {
    fetchTypes(getCategory(to));
  }
});
</script>
