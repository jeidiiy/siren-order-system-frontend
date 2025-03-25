<template>
  <AppHeader />
  <v-main>
    <v-container class="wrapper pa-0">
      <CategorySelector />
      <router-view />
    </v-container>
  </v-main>
  <StoreCartBar />
</template>

<script setup>
</script>
