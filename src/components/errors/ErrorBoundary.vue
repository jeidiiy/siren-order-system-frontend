<template>
  <div v-if="!hasError">
    <slot />
  </div>
  <div
    v-else
    class="error-content"
  >
    <div class="error-message">
      <div class="error-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.27 6.96 12 12.01l8.73-5.05" />
          <path d="M12 22.08V12" />
        </svg>
      </div>
      <h2 class="error-title">
        {{ errorMessage }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

onErrorCaptured((error) => {
  code.value = error.data.code;
  errorMessage.value = error.data.message;
  hasError.value = true;
});
const hasError = ref(false);
const code = ref(null);
const errorMessage = ref('');

</script>

<style scoped>
.error-content {
  padding: 2rem;
  text-align: center;
  background-color: #fef2f2;
  border-radius: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #fecaca;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.error-icon {
  color: #ef4444;
  margin-bottom: 0.5rem;
}

.error-title {
  margin: 0;
  color: #b91c1c;
  font-size: 1.25rem;
  font-weight: 600;
}

.error-description {
  color: #666;
  margin-top: 0.5rem;
}
</style>
