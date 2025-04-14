<template>
  <div>
    <v-card
      class="ma-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
      @keydown.enter="handleLogin"
    >
      <div class="d-flex justify-end">
        <v-btn
          variant="plain"
          icon="mdi-close"
          @click="closeModal"
        />
      </div>
      <div class="text-subtitle-1 text-medium-emphasis">
        ID
      </div>

      <v-text-field
        v-model="inputUsername"
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        비밀번호
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="비밀번호를 입력해주세요"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="handleLogin"
      >
        로그인
      </v-btn>

      <v-card-text class="text-center">
        <router-link
          class="text-blue text-decoration-none"
          to="/signup"
        >
          회원가입 <v-icon icon="mdi-chevron-right" />
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import useAuthStore from "@/stores/auth";
import useCartStore from "@/stores/cart";

const authStore = useAuthStore();
const {username, accessToken} = storeToRefs(authStore);
const {login} = authStore;

const cartStore = useCartStore();
const {getCart} = cartStore;

const visible = ref(false);
const inputUsername = ref('');
const password = ref('');

async function handleLogin() {
  if (await login(inputUsername.value, password.value)) {
    await getCart(username.value, accessToken.value);
    closeModal();
  }
};

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}
</script>
