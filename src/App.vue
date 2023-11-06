<template>
  <router-view />
</template>

<script setup>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
defineComponent({
  name: 'App'
})
onMounted(() => {
  checkToken()
})
const router = useRouter()
const checkToken = () => {
  store.dispatch('checkToken')
}
// 'https://dummyjson.com/auth/RESOURCE
</script>
