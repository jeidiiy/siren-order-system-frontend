<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <TypeList />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </ErrorBoundary>
</template>
<script setup>
</script>
