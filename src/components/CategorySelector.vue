<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle
          v-model="text"
          color="success"
          mandatory
        >
          <v-btn
            value="beverage"
            @click="router.push('/categories?category=beverage')"
          >
            음료
          </v-btn>
          <v-btn
            value="food"
            @click="router.push('/categories?category=food')"
          >
            푸드
          </v-btn>
          <v-btn
            value="merchandise"
            @click="router.push('/categories?category=merchandise')"
          >
            상품
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const text = ref(route.path === '/' ? 'beverage' : route.query.category);
</script>
