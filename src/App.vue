<template>
  <v-app class="bg-surface-variant">
    <router-view />
  </v-app>
</template>

<script setup>
import {onMounted} from "vue";
import {useAppStore} from "./stores/app";
const store = useAppStore();
onMounted(() => {
  store.silentRefresh();
});
</script>
