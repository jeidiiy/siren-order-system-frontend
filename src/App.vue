<template>
  <v-app class="bg-surface-variant">
    <router-view />
  </v-app>
</template>

<script setup>
import useAuthStore from "./stores/auth";
const authStore = useAuthStore();
onMounted(() => {
  authStore.silentRefresh();
});
</script>
