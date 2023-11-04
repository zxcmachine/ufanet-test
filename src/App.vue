<template>
  <router-view />
</template>

<script setup>
import { defineComponent, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const token = localStorage.getItem('authToken')
const store = useStore();
defineComponent({
  name: 'App'
})

onMounted(() => {
  fetchUser()
})
const router = useRouter()

const logins = localStorage.getItem('logins') // !!

const fetchUser = () => {
  api.get('/auth/RESOURCE').then((res) => {  // костыльная апиха этот запрос не возвращает юзера
    console.log(res)

    api.post('/auth/login', {
      username: logins.username,
      password: logins.password,
    }).then((res) => {
      const token = res.data.token
      const user = {
        name: res.data.firstName,
        email: res.data.email,
        role: 'user',
        id: res.data.id,
        image: res.data.image,
        username: res.data.username,
      }
      store.commit('updateUser', user);
      store.commit('updateToken', token);
    })


  }).catch((err) => {
    console.log(err, 'error fetch app vue')
    if (err.response.status == 401) {
      localStorage.clear()
      router.push('/auth')
    }
    console.log(err.response)
  })
}


// 'https://dummyjson.com/auth/RESOURCE
</script>
<style>
body {
  background: #181819;
}
</style>