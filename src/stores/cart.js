import {get, remove, removeAll, upsert} from "@/apis/cart";
import {defineStore} from 'pinia';

const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const loading = ref(false);

  const totalPrice = computed(() => cart.value.reduce((sum, product) => sum + (product.price * product.quantity), 0));
  const totalQuantity = computed(() => cart.value.reduce((sum, product) => sum + product.quantity, 0));

  async function getCart(username, accessToken) {
    try {
      loading.value = true;
      cart.value = await get(username, accessToken);
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  async function upsertProduct(username, accessToken, newProduct) {
    try {
      loading.value = true;
      cart.value = await upsert(username, accessToken, newProduct);
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  async function removeProduct(username, cartId, accessToken) {
    try {
      loading.value = true;
      cart.value = await remove(username, cartId, accessToken);
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  async function clearCart(username, accessToken) {
    try {
      loading.value = true;
      cart.value = await removeAll(username, accessToken);
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  function clearCartOnBrowser() {
    cart.value = [];
  }

  return {cart, loading, totalPrice, totalQuantity, getCart, upsertProduct, removeProduct, clearCart, clearCartOnBrowser};
}, {
  persist: true
});

export default useCartStore;
