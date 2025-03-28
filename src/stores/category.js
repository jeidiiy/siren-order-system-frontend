import {defineStore} from 'pinia';

const useCategoryStore = defineStore('category', () => {
  const category = ref('beverage');

  function changeCategory(newCategory) {
    category.value = newCategory;
  }
  return {category, changeCategory};
}, {
  persist: true
});

export default useCategoryStore;
