import {defineStore} from 'pinia';

const useCategoryStore = defineStore('category', {
  state: () => ({
    category: ''
  }),

  actions: {
    changeCategory(category) {
      this.category = category;
    }
  },
});

export default useCategoryStore;
