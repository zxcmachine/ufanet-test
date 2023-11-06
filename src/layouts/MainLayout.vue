<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar class="header-toolbar">
        <q-toolbar-title class="header__links-wrapper">
          <a href="#" class="header__links-link"> noty </a>
          <router-link class="header__links-link" to="/" v-if="user.role == 'admin'"> Заметки пользователей </router-link>
          <router-link class="header__links-link" to="/users" v-if="user.role == 'admin'"> Пользователи </router-link>
        </q-toolbar-title>
        <div class="flex header-items">
          <div class="header-icon"><img :src="user.image" alt="image"></div>
          <div class="header-content">
            <div class="header-text">{{ user.username }}</div>
            <div class="header-text">{{ user.email }}</div>
          </div>
          <div class="header-logout flex" @click="logout">
            <test-img :icon-name="'logout-icon'"></test-img>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import TestImg from 'src/components/img/TestImg.vue';
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore();
const user = computed(() => store.getters.getUser)

const logout = () => {
  localStorage.clear()
  router.push('/auth')
}
</script>

<style scoped>
.header__links-wrapper{
  display: flex;
  gap: 10px;
}
.header__links-link{
  color: white;
  text-decoration: none;
}
.header__links-link.router-link-active{
  color: #005FF9;
}
.header-icon {
  max-width: 48px;
  max-height: 48px;
  overflow: hidden;
  border-radius: 50%;
}

.header-items {
  gap: 10px;
}

.header-icon img {
  width: 100%;
  object-fit: cover;
}

.header-toolbar {
  padding: 16px;
}

.header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-text {
  display: flex;
}
</style>