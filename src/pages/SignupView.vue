<template>
  <v-form
    validate-on="submit lazy"
    @submit.prevent
  >
    <v-container max-width="500">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="username"
            :rules="usernameRule"
            label="ID"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            placeholder="비밀번호를 입력해주세요"
            :rules="passwordRule"
            label="비밀번호"
            @click:append-inner="visible = !visible"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="realname"
            :rules="realnameRule"
            label="이름"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="nickname"
            :rules="nicknameRule"
            label="별명"
          />
        </v-col>
        <v-col cols="12">
          <p>* 별명은 매장에서 직원이 불러드리는 이름입니다. 별명이 없으면 ID로 불러드립니다.</p>
        </v-col>
        <v-col cols="12">
          <v-btn
            :loading="loading"
            type="submit"
            color="success"
            block
            @click="submit"
          >
            회원가입
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import {signup} from "@/apis/user";
import useAuthStore from "@/stores/auth";

const username = ref('');
const usernameRule = [
  value => {
    if (/^[a-zA-Z]+$/.test(value)) return true;
    return "ID는 영어로만 작성해야 합니다";
  }
];

const realname = ref('');
const realnameRule = [
  value => {
    if (/^[가-힣]{1,6}$/.test(value)) return true;
    return "이름은 1~6자의 한글만 가능합니다";
  }
];

const password = ref('');
const passwordRule = [
  value => {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) return true;
    return "비밀번호는 8~15자의 영문, 숫자, 특수문자만 가능합니다";
  }
];

const nickname = ref('');
const nicknameRule = [
  value => {
    if (/^[가-힣]{1,6}$/.test(value)) return true;
    return "별명은 1~6자의 한글만 가능합니다";
  }
];

// 비밀번호 표시 여부를 위한 반응형 변수
const visible = ref(false);

// 폼 제출 시 로딩 처리를 위한 반응형 변수
const loading = ref(false);

const authStore = useAuthStore();
const {login} = authStore;
const router = useRouter();

async function submit() {
  try {
    loading.value = true;
    await signup(username.value, password.value, realname.value, nickname.value);
    window.alert("회원가입에 성공했습니다!!");
    // 회원가입 성공 시 자동 로그인 처리 후 메인 화면으로 이동
    await login(username.value, password.value);
    router.push('/');
  } catch (error) {
    // TODO: 에러 처리 필요
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>
