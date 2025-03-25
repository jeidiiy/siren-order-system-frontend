<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <ProductList />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </ErrorBoundary>
</template>

<script setup>
</script>
