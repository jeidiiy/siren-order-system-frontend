<template>
  <v-app-bar
    elevation="0"
    color="primary"
    scroll-behavior="hide"
    scroll-threshold="68"
  >
    <v-container class="d-flex justify-space-between align-center wrapper">
      <v-app-bar-title class="text-h5">
        사이렌 오더
      </v-app-bar-title>
      <v-btn
        v-if="!store.accessToken"
        append-icon="mdi-login"
        @click="dialog = true"
      >
        <span class="text-h6">
          로그인
        </span>
      </v-btn>
      <v-menu v-else>
        <template #activator="{props}">
          <v-btn v-bind="props">
            {{ store.user.username }}
            <v-icon icon="mdi-menu-down" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="callbacks[index]"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <LoginForm @close="dialog = false" />
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAppStore} from "@/stores/app";
import LoginForm from "./LoginForm.vue";

const dialog = ref(false);
const router = useRouter();
const store = useAppStore();
const items = [
  {title: '설정'},
  {title: '로그아웃'}
];
const callbacks = [
  () => {}, // TODO: 개인 정보 수정 페이지로 이동하는 콜백 함수 필요
  () => {
    store.logout();
    router.push('/');
  }
];
</script>
