<template>
  <v-card
    max-width="1000"
    class="mx-auto"
  >
    <v-card-item>
      <v-icon
        icon="mdi-arrow-left"
        @click="closeModal"
      />
    </v-card-item>
    <v-img :src="store.imageUrl" />
    <v-card-title>
      {{ store.storeName }}
    </v-card-title>
    <v-card-subtitle>
      {{ store.address }}
    </v-card-subtitle>
    <v-card-text>
      <p>
        <v-icon>mdi-clock-time-three-outline</v-icon> 사이렌 오더 운영 시간
      </p>
      <p class="text-body-2 pl-6">
        <v-icon>mdi-circle-small</v-icon>{{ store.openAt }} - {{ store.closeAt }}
      </p>
    </v-card-text>
    <v-card-text>
      픽업은 어떻게 하시겠어요?
      <v-card-actions>
        <div
          v-for="option in store.pickupOptions"
          :key="option.name"
        >
          <v-hover>
            <template #default="{isHovering, props}">
              <div
                v-bind="props"
                class="pa-5 my-5 border-md rounded"
                :class="isHovering ? 'cursor-pointer opacity-100' : 'opacity-70'"
                @click="() => {
                  showAlert(store.storeName, option.name);
                  changeStore({...store, pickupOption: option.name});
                  closeModal();
                  $router.push('/')
                }"
              >
                <div class="text-center pa-2">
                  <v-icon :icon="pickupOptionIcons[option.name]" />
                </div>
                <div class="text-center">
                  {{ option.name }}
                </div>
                <div class="text-center text-medium-emphasis">
                  {{ option.description }}
                </div>
              </div>
            </template>
          </v-hover>
        </div>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {getStoreById} from "@/apis/store";
import useStoreStore from "@/stores/store";

const storeProps = defineProps({
  id: {
    type: Number,
    default: -1
  }
});

const pickupOptionIcons = {
  '차량 픽업': 'mdi-car-side',
  '매장 이용': 'mdi-coffee',
  'to_go': 'mdi-shoe-print',
  '딜리버스': 'mdi-motorbike'
};

const emits = defineEmits(['close', 'alert']);
function closeModal() {
  emits('close');
}

const store = ref({});
const storeStore = useStoreStore();
const {changeStore} = storeStore;

function showAlert(storeName, pickupOption) {
  window.alert(`${storeName} (${pickupOption})을 선택하셨습니다!`);
}

onMounted(async () => {
  store.value = await getStoreById(storeProps.id);
});
</script>
