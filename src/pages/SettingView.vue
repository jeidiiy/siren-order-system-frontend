<template>
  <v-form
    ref="formRef"
    validate-on="submit lazy"
    :disabled="disabled"
    @submit.prevent
  >
    <v-container max-width="500">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="username"
            label="ID"
            disabled
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
            v-if="disabled"
            block
            @click="disabled = false"
          >
            수정하기
          </v-btn>
          <v-btn
            v-else
            :loading="loading"
            type="submit"
            color="success"
            block
            @click="submit"
          >
            제출
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn
            block
            color="warning"
            @click="router.push('/setting/password')"
          >
            비밀번호 변경하기
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import api from "@/apis/config";

const realname = ref('');
const realnameRule = [
  value => {
    if (/^[가-힣]{1,6}$/.test(value)) return true;
    return "이름은 1~6자의 한글만 가능합니다";
  }
];

const nickname = ref('');
const nicknameRule = [
  value => {
    if (/^[가-힣]{1,6}$/.test(value)) return true;
    return "별명은 1~6자의 한글만 가능합니다";
  }
];

// 기본 조회 시 변경하지 못하도록 세팅
const disabled = ref(true);

// 폼 제출 시 로딩 처리를 위한 반응형 변수
const loading = ref(false);

const router = useRouter();

const {username, accessToken} = JSON.parse(localStorage.getItem('auth'));
api.defaults.headers.common['Authorization'] = "Bearer " + accessToken;

async function getUserInfo() {
  try {
    const res = await api.get(`/api/v1/users/${username}`);
    const userInfo = res.data;
    nickname.value = userInfo.nickname;
    realname.value = userInfo.realname;
  } catch (error) {
    console.error(error);
  }
}

const formRef = ref(null);

onMounted(() => {
  formRef.value.focus();
  getUserInfo();
});

async function submit() {
  const {valid: isValid} = await formRef.value.validate();

  if (isValid) {
    try {
      loading.value = true;
      await api.patch(`/api/v1/users/${username}`, {realname: realname.value, nickname: nickname.value});
      window.alert("회원정보를 변경했습니다.");
      // 회원 정보 변경 성공 시 메인 화면으로 강제 이동
      router.push('/');
    } catch (error) {
      // TODO: 에러 처리 필요
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
}
</script>
