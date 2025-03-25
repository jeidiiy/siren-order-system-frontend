<template>
  <v-app-bar
    elevation="0"
    color="primary"
    location="bottom"
  >
    <v-container
      class="wrapper d-flex justify-space-between align-center"
    >
      <div
        class="button-wrapper"
      >
        <v-btn
          class="text-h6"
          width="100%"
          @click="$router.push('/stores')"
        >
          여기를 클릭해서 주문할 매장을 선택해주세요
        </v-btn>
      </div>
      <v-btn>
        <v-icon>mdi-basket-plus-outline</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.button-wrapper {
  width: 100%;
}
</style>
