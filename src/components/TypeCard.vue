<template>
  <v-card
    hover
    max-width="270"
    height="270"
    class="mx-auto"
    @click="$router.push(`/products?typeId=${id}&category=${$route.query.category}`)"
  >
    <v-img
      color="surface-variant"
      height="150"
      src="https://cdn.pixabay.com/photo/2023/11/14/17/58/coffee-8388244_640.jpg"
      cover
    />
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ description }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
const props = defineProps({
  info: {
    type: {
      id: Number,
      title: String,
      description: String,
    },
    required: true,
    default: () => ({id: 0, title: 'title', description: 'description'})
  }
});

const {id, title, description} = props.info;
</script>
<style scoped>
.padding-top {
  padding-top: 100%;
}
</style>
