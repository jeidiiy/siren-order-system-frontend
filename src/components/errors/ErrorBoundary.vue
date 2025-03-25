<template>
  <slot v-if="!hasError" />
  <div v-else>
    뭔가 잘못됐따...
  </div>
</template>

<script setup>
onErrorCaptured((error, instance, info) => {
  console.error(error);
  hasError.value = true;
});
const hasError = ref(false);
</script>

<style lang="scss" scoped></style>
