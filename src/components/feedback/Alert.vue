<template>
  <v-alert
    v-model="alert"
    class="alert"
    close-label="Close Alert"
    closable
    title="알림"
    :color="`${type}`"
    :icon="`$${type}`"
    :type="type"
  >
    <v-progress-linear
      class="position-absolute top-0 left-0 border-t-4"
      color="green"
      height="4"
      :model-value="progress"
    />
    {{ msg }}
  </v-alert>
</template>

<script setup>
import useAlertStore from "@/stores/alert";

const alertStore = useAlertStore();
const {alert, msg, type, progress} = storeToRefs(alertStore);
</script>

<style lang="scss" scoped>
.alert {
  position: absolute; top: 30px; right: 30px; z-index: 2000;
}
</style>
