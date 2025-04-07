import {defineStore} from 'pinia';

const useCartStore = defineStore('cart', () => {
  const cart = ref([]);

  const totalPrice = computed(() => cart.value.reduce((sum, product) => sum + (product.basePrice * product.quantity), 0));
  const totalQuantity = computed(() => cart.value.reduce((sum, product) => sum + product.quantity, 0));

  function addProduct(newProduct) {
    const existingProduct = cart.value.find(product => product.id === newProduct.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.value.push({...newProduct, quantity: 1});
    }
  }

  function reduceProductQuantity(productId) {
    const existingProduct = cart.value.find(product => product.id === productId);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    }
  }

  function removeProduct(removeProductId) {
    cart.value = cart.value.filter(product => product.id !== removeProductId);
  }

  function removeAll() {
    cart.value = [];
  }

  return {cart, totalPrice, totalQuantity, addProduct, reduceProductQuantity, removeProduct, removeAll};
}, {
  persist: true
});

export default useCartStore;
