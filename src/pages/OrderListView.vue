<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <OrderList />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </ErrorBoundary>
</template>

<script setup>
</script>
