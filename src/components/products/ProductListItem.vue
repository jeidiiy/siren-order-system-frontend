<template>
  <v-card
    hover
    max-width="270"
    height="270"
    class="mx-auto"
  >
    <v-img
      color="surface-variant"
      height="150"
      src="https://cdn.pixabay.com/photo/2023/11/14/17/58/coffee-8388244_640.jpg"
      cover
    />
    <v-card-title>
      {{ krName }}
    </v-card-title>
    <v-card-subtitle>
      {{ enName }}
    </v-card-subtitle>
    <v-card-text>
      &#8361;{{ basePrice.toLocaleString() }}
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  info: {
    type: {
      id: Number,
      krName: String,
      enName: String,
      basePrice: Number,
      imageUrl: String
    },
    required: true,
    default: () => ({id: 0, krName: '제목', enName: 'title', basePrice: '3000', imageUrl: ''})
  }
});

const {krName, enName, basePrice} = props.info;

</script>
<style scoped>
.padding-top {
  padding-top: 100%;
}
</style>
