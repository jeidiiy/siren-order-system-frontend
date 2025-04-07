import {defineStore} from 'pinia';

const useAlertStore = defineStore('alert', () => {
  const alert = ref(false);
  const msg = ref("");
  const type = ref("");
  const progress = ref(100);
  let intervalId = null;

  const showAlert = (message, newType, duration = 3000) => {
    msg.value = message;
    type.value = newType;
    alert.value = true;
    progress.value = 100;

    if (intervalId) clearInterval(intervalId);

    const interval = 100; // ms 단위
    const step = 100 / (duration / interval);

    intervalId = setInterval(() => {
      progress.value -= step;
      if (progress.value <= 0) {
        progress.value = 0;
        alert.value = false;
        clearInterval(intervalId);
      }
    }, interval);
  };

  return {alert, progress, msg, type, showAlert};
});

export default useAlertStore;
