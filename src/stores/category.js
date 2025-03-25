import {defineStore} from 'pinia';
import {useRoute} from "vue-router";

const route = useRoute();

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
