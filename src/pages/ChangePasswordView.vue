<template>
  <v-form
    ref="formRef"
    validate-on="submit lazy"
    @submit.prevent
  >
    <v-container max-width="500">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="oldPassword"
            type="password"
            :rules="passwordRule"
            label="현재 비밀번호"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="newPassword"
            type="password"
            :rules="passwordRule"
            label="새 비밀번호"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="checkNewPassword"
            type="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            :rules="passwordCheckRule"
            label="비밀번호 확인"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
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
            @click="router.push('/setting')"
          >
            개인정보 변경하기
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import {changePassword} from "@/apis/user";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const oldPassword = ref('');
const newPassword = ref('');
const checkNewPassword = ref('');
// 폼 제출 시 로딩 처리를 위한 반응형 변수
const loading = ref(false);

const passwordRule = [
  value => {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) return true;
    return "비밀번호는 8~15자의 영문, 숫자, 특수문자만 가능합니다";
  }
];

const passwordCheckRule = [
  value => {
    if (newPassword.value === value) return true;
    return "새 비밀번호와 다릅니다.";
  }
];

const formRef = ref(null);

onMounted(() => {
  formRef.value.focus();
});

async function submit() {
  const {valid: isValid} = await formRef.value.validate();

  if (isValid) {
    try {
      loading.value = true;
      await changePassword(authStore.username, oldPassword.value, newPassword.value, authStore.accessToken);
      window.alert("비밀번호를 변경했습니다. 새 비밀번호로 다시 로그인 해주세요.");
      await authStore.logout();
      // 회원 정보 변경 성공 시 메인 화면으로 강제 이동
      router.push('/');
    } catch (error) {
      if (error.response.status === 409) {
        alert('현재 비밀번호가 다릅니다.');
      } else {
        console.error(error);
      }
    } finally {
      loading.value = false;
    }
  }
}
</script>
