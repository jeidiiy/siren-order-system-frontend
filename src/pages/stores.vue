<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <StoreList />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </ErrorBoundary>
</template>
<script setup>
</script>
