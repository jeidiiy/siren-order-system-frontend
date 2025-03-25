<template>
  <v-card>
    <v-img :src="store.imageUrl" cover height="270" />
    <div class="d-flex flex-column">
      <v-card-title>{{ store.storeName }}</v-card-title>
      <v-card-subtitle>{{ store.address }}</v-card-subtitle>
      <v-card-text>
        <v-icon v-for="pickupOption in store.pickupOptions" :key="pickupOption.name"
          :icon="getIcon(pickupOption.name)" />
      </v-card-text>
    </div>
  </v-card>
</template>
<script setup>
defineProps({
  store: {
    type: Object,
    default: () => ({
      storeId: 0,
      imageUrl: '',
      storeName: 'storeName',
      address: 'address',
      pickupOptions: [
        {name: '차량 픽업', description: '차로 받을게요'},
        {name: '딜리버스', description: '배달로 받을게요'}
      ]
    })
  }
});

const getIcon = (name) => {
  return name === '차량 픽업' ? 'mdi-car-hatchback' : 'mdi-motorbike';
};
</script>
