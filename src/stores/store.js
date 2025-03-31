import {defineStore} from 'pinia';

const useStoreStore = defineStore('store', () => {
  const store = ref(null);

  function changeStore(newStore) {
    store.value = newStore;
  }
  return {store, changeStore};
}, {
  persist: true
});

export default useStoreStore;
